package com.robot.v1.api;

import com.robot.v1.core.dto.CoordinatesDto;
import com.robot.v1.core.dto.HistoricDto;
import com.robot.v1.core.model.Historic;
import com.robot.v1.service.HistoricService;
import io.swagger.annotations.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@Api(value = "User")
@RestController
@RequestMapping("robot/v1")
public class HistoricController {

    @Resource
    private HistoricService historicService;

    @RequestMapping(value = "/get_historic",
            method = RequestMethod.GET,
            produces = "application/json")
    @ApiOperation(
            value = "Get historic for student",
            tags = "get"
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "User not found")
    })
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "Page number", dataType = "long", paramType = "query", defaultValue = "0"),
            @ApiImplicitParam(name = "size", value = "Page size", dataType = "long", paramType = "query", defaultValue = "1000")
    })
    public Page<HistoricDto> getHistoricFor(@RequestParam String userName,
                                               @PageableDefault(page = 0, size = 1000) Pageable pageable) {

        return historicService.getHistoricFor(userName, pageable);
    }

    @RequestMapping(value = "/create_historic_entry",
            method = RequestMethod.POST,
            produces = "application/json")
    @ApiOperation(
            value = "Create historic entry",
            tags = "get"
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "User not found")
    })
    public void createHistoricEntry(@RequestParam String userName,
                                        @RequestParam String details,
                                        @RequestBody List<CoordinatesDto> coordinatesList) {
        historicService.createHistoric(userName, details, coordinatesList);
    }
}
