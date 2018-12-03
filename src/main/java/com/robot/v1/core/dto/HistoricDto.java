package com.robot.v1.core.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HistoricDto {

//    private String path;

    private Date date;

    private String userName;

    private String details;

    private Long id;

}
