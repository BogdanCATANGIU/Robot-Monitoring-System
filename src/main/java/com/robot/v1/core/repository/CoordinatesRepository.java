package com.robot.v1.core.repository;

import com.robot.v1.core.model.Coordinates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface CoordinatesRepository extends PagingAndSortingRepository<Coordinates, Long>, JpaRepository<Coordinates, Long> {

    List<Coordinates> findByHistoricId(Long historicId);
}
