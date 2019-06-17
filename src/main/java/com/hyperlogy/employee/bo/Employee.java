package com.hyperlogy.employee.bo;

import com.hyperlogy.framework.HyperBo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_manager")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee implements HyperBo<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "CODE")
    private String code;

    @Column(name = "IMAGE")
    private String image;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "DATE_OF_BIRTH")
    private Date dateOfBirth;

    @Override
    public Integer getId() {
        return this.id;
    }

    @Override
    public void setId(Integer key) {
        this.id = key;
    }
}
