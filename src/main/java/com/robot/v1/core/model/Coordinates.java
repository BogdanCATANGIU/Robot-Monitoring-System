package com.robot.v1.core.model;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "COORDINATES")
public class Coordinates {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Setter(AccessLevel.NONE)
    @Column(name = "C_ID")
    private Long id;

    @Column(name = "C_DX")
    private BigDecimal dx;

    @Column(name = "C_DY")
    private BigDecimal dy;

    @Column(name = "C_DZ")
    private BigDecimal dz;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "C_H_ID")
    private Historic historic;

    @Column(name = "C_H_ID", insertable = false, updatable = false)
    private Long historicId;

    public void setHistoric(Historic historic) {
        if (historic != null) {
            this.historicId = historic.getId();
        }
        this.historic = historic;
    }
}
