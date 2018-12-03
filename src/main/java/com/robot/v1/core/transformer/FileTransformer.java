package com.robot.v1.core.transformer;

import com.robot.v1.core.dto.FileDto;
import com.robot.v1.core.model.File;
import org.apache.commons.collections4.Transformer;

public class FileTransformer implements Transformer<File, FileDto> {

    public FileDto transform(File in) {
        FileDto out = new FileDto();
        out.setId(in.getId());
        out.setName(in.getName());
        out.setFile(in.getFile());
        out.setType(in.getType());
        return out;
    }
}
