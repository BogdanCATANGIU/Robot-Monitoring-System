package com.robot.v1.service;

import com.robot.exception.IncorrectDataException;
import com.robot.v1.core.dto.UserDto;
import com.robot.v1.core.model.User;
import com.robot.v1.core.repository.UserRepository;
import com.robot.v1.core.transformer.UserTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.transaction.UserTransaction;

import java.util.ArrayList;
import java.util.List;

import static com.robot.v1.utils.HashGen.generateHash;

@Component
@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private static final String SALT = "this-is-hidden";

    public UserDto register(String name, String password, String isAdmin, Long professorId) {

        User user = new User();
        user.setName(name);
        if (isAdmin.equals("yes")) {
            user.setIsAdmin("yes");
        } else {
            user.setIsAdmin("no");
            User professor = userRepository.findById(professorId);
            if (professor == null) {
                throw new IncorrectDataException("Professor doesn't exist.");
            }
            user.setProfessor(professor);
        }

        String saltedPassword = SALT + password;
        String hashedPassword = generateHash(saltedPassword);
        user.setPassword(hashedPassword);

        userRepository.save(user);

        UserTransformer transformer = new UserTransformer();

        return transformer.transform(user);
    }

    public UserDto login(String name, String password) {

        //encript the password entered by the user to match it with the password stored in the database
        String saltedPassword = SALT + password;
        String hashedPassword = generateHash(saltedPassword);

        User user = userRepository.findByNameAndPassword(name, hashedPassword);

        if (user == null) {
            throw new IncorrectDataException("Password or name is incorrect!");

        } else {
            UserTransformer transformer = new UserTransformer();
            return transformer.transform(user);
        }
    }

    public Page<UserDto> getStudents(String name, Pageable pageable) {

        Pageable currentPage = pageable.previousOrFirst();

//        String saltedPassword = SALT + password;
//        String hashedPassword = generateHash(saltedPassword);

        User professor = userRepository.findByName(name);

        if (professor == null) {
            throw new IncorrectDataException("Password or name is incorrect!");
        }

        if (professor.getIsAdmin().equals("yes")) {
            Page<User> students = userRepository.findByProfessorId(professor.getId(), currentPage);
            List<User> studentList = students.getContent();
            UserTransformer transformer = new UserTransformer();
            List<UserDto> studentDtos = new ArrayList<>();
            for (User student : studentList) {
                studentDtos.add(transformer.transform(student));
            }
            return new PageImpl<UserDto>(studentDtos, currentPage,studentDtos.size());
        } else {
            throw new IncorrectDataException("User is not professor");
        }

    }

    public List<User> getProfessors() {
        return userRepository.findByIsAdmin("yes");
    }
}
