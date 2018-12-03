package com.robot.v1.api;


import com.robot.v1.core.dto.FileDto;
import com.robot.v1.core.model.File;
import com.robot.v1.core.model.Historic;
import com.robot.v1.core.repository.FileRepository;
import com.robot.v1.core.repository.HistoricRepository;
import com.robot.v1.core.transformer.FileTransformer;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import org.apache.commons.io.IOUtils;
import org.hibernate.Hibernate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;
import sun.nio.ch.IOUtil;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Api(value = "User")
@RestController
@RequestMapping("robot/v1")
public class FileController {
    @Resource
    FileRepository fileRepository;

    @Resource
    HistoricRepository historicRepository;

    @RequestMapping(value = "upload_file",
                    method = RequestMethod.POST)
    public String uploadFile(@RequestParam MultipartFile file,
                             @RequestParam Long historicId) throws Exception {

        File upFile = new File();
        Historic historic = historicRepository.findById(historicId);
        try {
            Blob blob = new javax.sql.rowset.serial.SerialBlob(IOUtils.toByteArray(file.getInputStream()));
            upFile.setName(file.getOriginalFilename());
            upFile.setFile(blob);
            upFile.setHistoric(historic);
            upFile.setType(file.getContentType());
            fileRepository.save(upFile);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "Success";
    }

    @RequestMapping(value = "/get_files",
            method = RequestMethod.GET)
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "Page number", dataType = "long", paramType = "query", defaultValue = "0"),
            @ApiImplicitParam(name = "size", value = "Page size", dataType = "long", paramType = "query", defaultValue = "1000")
    })
    public Page<FileDto> getFiles(@RequestParam Long historicId,
                                  @PageableDefault(page = 0, size = 1000) Pageable pageable) {
        Pageable currentPage = pageable.previousOrFirst();
        Page<File> files = fileRepository.getByHistoricId(historicId, currentPage);
        List<File> fileList = files.getContent();

        List<FileDto> fileDtos = new ArrayList<>();
        FileTransformer transformer = new FileTransformer();
        for (File file : fileList) {
            fileDtos.add(transformer.transform(file));
        }
        return new PageImpl<FileDto>(fileDtos, currentPage, fileDtos.size());
    }

    @RequestMapping(value = "/download_file")
    public String download(@RequestParam Long documentId,
                                          HttpServletResponse response) throws IOException, SQLException {
        File doc = fileRepository.getById(documentId);

        try {
            response.setHeader("Content-Disposition", "attachment; filename=\"" +doc.getName()+ "\"");
            OutputStream out = response.getOutputStream();
            response.setContentType(doc.getType());
            IOUtils.copy(doc.getFile().getBinaryStream(), out);
            out.flush();
            out.close();

        } catch (IOException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }


        return null;
    }

    @RequestMapping(value = "/delete_file",
            method = RequestMethod.DELETE)
    public String remove(@RequestParam Long documentId) {
        fileRepository.delete(documentId);
        return null;
    }

}
