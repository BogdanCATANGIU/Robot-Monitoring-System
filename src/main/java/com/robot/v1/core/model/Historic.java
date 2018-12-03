package com.robot.v1.core.model;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

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
@Table(name = "HISTORIC")
public class Historic {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Setter(AccessLevel.NONE)
    @Column(name = "H_ID")
    private Long id;

    @Column(name = "H_DATE")
    private Date date;

    @Column(name = "H_DETAILS")
    private String details;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "H_U_ID")
    private User user;

    @Column(name = "H_U_ID", insertable = false, updatable = false)
    private Long userId;

    public void setUser(User user) {
        if (user != null) {
            this.userId = user.getId();
        }
        this.user = user;
    }

    public void setDate() {
        DateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
        Date currentDate = new Date();
        try {
            this.date = formatter.parse(formatter.format(currentDate));
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}