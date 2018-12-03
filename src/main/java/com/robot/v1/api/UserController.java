package com.robot.v1.api;

import com.robot.exception.IncorrectDataException;
import com.robot.v1.core.dto.UserDto;
import com.robot.v1.core.model.User;
import com.robot.v1.service.UserService;
import io.swagger.annotations.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@Api(value = "User")
@RestController
@RequestMapping("robot/v1")
public class UserController {

    @Resource
    UserService userService;

    @RequestMapping(value = "/register",
            method = RequestMethod.POST,
            produces = "application/json")
    @ApiOperation(value = "register",
            tags = "create entry",
            response = User.class)
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success")
    })
    public UserDto register(@RequestParam String userName,
                            @RequestParam String password,
                            @RequestParam String confirmPassword,
                            @RequestParam String isAdmin,
                            @RequestParam(required = false) Long professorId) {

        userName = StringUtils.trimToNull(userName);
        password = StringUtils.trimToNull(password);
        confirmPassword = StringUtils.trimToNull(confirmPassword);

        if (password.equals(confirmPassword)){
            return userService.register(userName, password, isAdmin, professorId);
        } else {
            throw new IncorrectDataException("Passwords don't match!");
        }
    }

    @RequestMapping(value = "/login",
            method = RequestMethod.GET,
            produces = "application/json")
    @ApiOperation(value = "Login",
            tags = "get",
            response = User.class)
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Username or password is incorrect")
    })
    public UserDto login(@RequestParam String userName,
                         @RequestParam String password) {

        userName = StringUtils.trimToNull(userName);
        password = StringUtils.trimToNull(password);

        return userService.login(userName, password);
    }

    @RequestMapping(value = "/get_students",
            method = RequestMethod.GET,
            produces = "application/json")
    @ApiOperation(
            value = "Get studentd",
            tags = "get"
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Username or password is incorrect or user is not professor")
    })
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "Page number", dataType = "long", paramType = "query", defaultValue = "0"),
            @ApiImplicitParam(name = "size", value = "Page size", dataType = "long", paramType = "query", defaultValue = "1000")
    })
    public Page<UserDto> getPageOfStudents(@RequestParam String userName,
                                           @PageableDefault(page = 0, size = 1000) Pageable pageable) {

        return userService.getStudents(userName, pageable);
    }

    @RequestMapping(value = "/get_professors",
            method = RequestMethod.GET,
            produces = "application/json")
    @ApiOperation(
            value = "Get professors",
            tags = "get"
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success")
    })
    public List<User> getProfessors(){
        return userService.getProfessors();
    }
}
