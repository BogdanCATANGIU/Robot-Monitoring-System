package com.robot.v1.core.repository;

import com.robot.v1.core.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long>, JpaRepository<User, Long> {

    User findByNameAndPassword(String name, String password);

    User findByName(String name);

    User findById(Long id);

    Page<User> findByProfessorId(Long professorId, Pageable pageable);

    List<User> findByIsAdmin(String isAdmin);
}
