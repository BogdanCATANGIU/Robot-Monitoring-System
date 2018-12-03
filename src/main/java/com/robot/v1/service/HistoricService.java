package com.robot.v1.service;

import com.robot.exception.IncorrectDataException;
import com.robot.v1.core.dto.CoordinatesDto;
import com.robot.v1.core.dto.HistoricDto;
import com.robot.v1.core.model.Coordinates;
import com.robot.v1.core.model.Historic;
import com.robot.v1.core.model.User;
import com.robot.v1.core.repository.CoordinatesRepository;
import com.robot.v1.core.repository.HistoricRepository;
import com.robot.v1.core.repository.UserRepository;
import com.robot.v1.core.transformer.HistoricTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.robot.v1.utils.HashGen.generateHash;

@Component
@Service
@Transactional
public class HistoricService {

    @Autowired
    private HistoricRepository historicRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CoordinatesRepository coordinatesRepository;

    private static final String SALT = "hard-to-crack";

    public Page<HistoricDto> getHistoricFor(String userName, Pageable pageable) {

        User user = userRepository.findByName(userName);
        if (user == null) {
            throw new IncorrectDataException("User not found");
        }

        Pageable currentPage = pageable.previousOrFirst();

        Page<Historic> historicPage = historicRepository.findByUserId(user.getId(), currentPage);
        List<Historic> historicList = historicPage.getContent();

        HistoricTransformer transformer = new HistoricTransformer();

        List<HistoricDto> historicDtoList = new ArrayList<>();
        for (Historic historic : historicList) {
            historicDtoList.add(transformer.transform(historic));
        }

        return new PageImpl<HistoricDto>(historicDtoList, currentPage, historicDtoList.size());
    }

    public Historic createHistoric(String userName, String details, List<CoordinatesDto> coordinatesDtos) {

        User user = userRepository.findByName(userName);
        if (user == null) {
            throw new IncorrectDataException("User not found");
        }

        Historic historic = new Historic();
        historic.setUser(user);
        historic.setDetails(details);
        historic.setDate();

        historicRepository.save(historic);

        for (CoordinatesDto coordinatesDto : coordinatesDtos) {
            Coordinates coordinates = new Coordinates();
            coordinates.setDx(coordinatesDto.getDx());
            coordinates.setDy(coordinatesDto.getDy());
            coordinates.setDz(coordinatesDto.getDz());
            coordinates.setHistoric(historic);
            coordinatesRepository.save(coordinates);
        }

        return historic;
    }

}
