package com.robot.v1.core.transformer;

import com.robot.v1.core.dto.CoordinatesDto;
import com.robot.v1.core.model.Coordinates;
import org.apache.commons.collections4.Transformer;

public class CoordinatesTransformer implements Transformer<Coordinates, CoordinatesDto>{

    public CoordinatesDto transform(Coordinates in) {

        CoordinatesDto out = new CoordinatesDto();
        out.setDx(in.getDx());
        out.setDy(in.getDy());
        out.setDz(in.getDz());

        return out;
    }
}
