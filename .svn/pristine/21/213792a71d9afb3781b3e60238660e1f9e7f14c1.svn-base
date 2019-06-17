package com.hyperlogy.test.bo;

import com.hyperlogy.framework.HyperBo;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Cache(usage = CacheConcurrencyStrategy.TRANSACTIONAL)
@Table(name = "TBL_ROLE")
public class Role implements HyperBo<Long> {

    @Id
//    @GeneratedValue(generator = "uuid")
//    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    protected Long id;
    @Column(name = "CODE")
    protected String code;
    @Column(name = "ROLENAME")
    protected String rolename;
    @Column(name = "CREATEBY")
    protected Long createby;
    @Column(name = "CREATEDATE")
    protected Date createdate;
    @Column(name = "UPDATEBY")
    protected Long updateby;
    @Column(name = "UPDATEDATE")
    protected Date updatedate;

    public Role(){

    }
    public Role(Long Key){
        this.setId(Key);
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long key) {
        this.id = key;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public Long getCreateby() {
        return createby;
    }

    public void setCreateby(Long createby) {
        this.createby = createby;
    }

    public Long getUpdateby() {
        return updateby;
    }

    public void setUpdateby(Long updateby) {
        this.updateby = updateby;
    }

    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    public Date getUpdatedate() {
        return updatedate;
    }

    public void setUpdatedate(Date updatedate) {
        this.updatedate = updatedate;
    }
}
