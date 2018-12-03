package com.robot.v1.service;

import com.robot.v1.core.dto.CoordinatesDto;
import com.robot.v1.core.model.Coordinates;
import com.robot.v1.core.repository.CoordinatesRepository;
import com.robot.v1.core.transformer.CoordinatesTransformer;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Component
@Service
@Transactional
public class CoordinatesService {

    @Resource
    CoordinatesRepository coordinatesRepository;

    public List<CoordinatesDto> getCoordinatesFor(Long historicId) {

        List<Coordinates> coordinatesList = coordinatesRepository.findByHistoricId(historicId);

        List<CoordinatesDto> coordinatesDtos = new ArrayList<>();
        CoordinatesTransformer transformer = new CoordinatesTransformer();

        for (Coordinates coordinates : coordinatesList) {
            coordinatesDtos.add(transformer.transform(coordinates));
        }

        return coordinatesDtos;
    }
}
