package com.robot.v1.core.model;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Setter(AccessLevel.NONE)
    @Column(name = "U_ID")
    private Long id;

    @Column(name = "U_NAME")
    private String name;

    @Column(name = "U_PASSWORD")
    private String password;

    @Column(name = "U_IS_ADMIN")
    private String isAdmin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "U_PROFESSOR")
    private User professor;

    @Column(name = "U_PROFESSOR", insertable = false, updatable = false)
    private Long professorId;

    public void setProfessor(User professor) {
        if (professor != null) {
            this.professorId = professor.getProfessorId();
        }
        this.professor = professor;
    }

}
