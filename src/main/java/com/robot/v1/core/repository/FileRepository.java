package com.robot.v1.core.repository;

import com.robot.v1.core.model.File;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface FileRepository extends CrudRepository<File, Long>{

    Page<File> getByHistoricId(Long historicId, Pageable pageable);

    File getById(Long id);
}
