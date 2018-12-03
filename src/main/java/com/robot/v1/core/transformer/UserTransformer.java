package com.robot.v1.core.transformer;

import com.robot.v1.core.dto.UserDto;
import com.robot.v1.core.model.User;
import org.apache.commons.collections4.Transformer;

public class UserTransformer implements Transformer<User, UserDto> {

    public UserDto transform(User in) {

        UserDto out = new UserDto();

        out.setName(in.getName());
        out.setIsAdmin(in.getIsAdmin());
        if (in.getProfessor() != null) {
            out.setProfessorName(in.getProfessor().getName());
        }

        return out;
    }
}
