package com.robot.v1.api;

import com.robot.v1.core.dto.CoordinatesDto;
import com.robot.v1.service.CoordinatesService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@Api(value = "User")
@RestController
@RequestMapping("robot/v1")
public class CoordinatesController {

    @Resource
    CoordinatesService coordinatesService;

    @RequestMapping(value = "/get_session_coordinates",
            method = RequestMethod.GET,
            produces = "application/json")
    @ApiOperation(value = "Get coordinates",
            tags = "get",
            response = List.class)
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success")
    })
    public List<CoordinatesDto> login(@RequestParam Long historicId) {

        return coordinatesService.getCoordinatesFor(historicId);
    }
}
