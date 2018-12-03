package com.robot.v1.core.repository;

import com.robot.v1.core.model.Historic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Transactional
@Repository
public interface HistoricRepository extends PagingAndSortingRepository<Historic, Long>, JpaRepository<Historic, Long> {

    Page<Historic> findByUserId(Long userId, Pageable pageable);

    Historic findById(Long id);
}
