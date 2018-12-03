package com.robot.v1.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import java.sql.Blob;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "FILE")
public class File {

    @Id
    @GeneratedValue
    @Column(name = "F_ID")
    private Long id;

    @Column(name = "F_NAME")
    private String name;

    @Lob
    @Column(name = "F_FILE")
    @JsonIgnore
    private Blob file;

    @Column(name = "F_H_ID", insertable = false, updatable = false)
    private Long historicId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "F_H_ID")
    private Historic historic;

    @Column(name = "F_TYPE")
    private String type;

    public void setHistoricId(Historic historic) {
        if (historic != null) {
            this.historicId = historic.getId();
        }
        this.historic = historic;
    }
}
