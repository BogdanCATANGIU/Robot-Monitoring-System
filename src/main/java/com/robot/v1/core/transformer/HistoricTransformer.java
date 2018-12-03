package com.robot.v1.core.transformer;

import com.robot.v1.core.dto.HistoricDto;
import com.robot.v1.core.model.Historic;
import org.apache.commons.collections4.Transformer;

public class HistoricTransformer implements Transformer<Historic, HistoricDto> {

    public HistoricDto transform(Historic in) {

        HistoricDto out = new HistoricDto();

//        out.setPath(in.getPath());
        out.setDetails(in.getDetails());
        out.setDate(in.getDate());
        out.setUserName(in.getUser().getName());
        out.setId(in.getId());

        return out;
    }
}
