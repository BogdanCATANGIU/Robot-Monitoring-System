package com.robot.v1.service;

import com.robot.v1.core.repository.FileRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;

@Service
@Transactional
public class FileService {

    @Resource
    FileRepository fileRepository;
}
