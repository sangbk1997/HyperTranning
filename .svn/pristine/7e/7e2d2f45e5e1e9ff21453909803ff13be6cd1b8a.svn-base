package com.hyperlogy.test.bo;

import com.hyperlogy.framework.HyperBo;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Cache(usage = CacheConcurrencyStrategy.TRANSACTIONAL)
@Table(name = "TBL_USER_ROLE")
public class UserRole implements HyperBo<Long> {
    @Id
//    @GeneratedValue(generator = "uuid")
//    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    protected Long id;
    @Column(name = "USERID")
    protected Long userid;
    @Column(name = "ROLEID")
    protected Long roleid;
    @Column(name = "CREATEBY")
    protected Long createby;
    @Column(name = "CREATEDATE")
    protected Date createdate;
    @Column(name = "UPDATEBY")
    protected Long updateby;
    @Column(name = "UPDATEDATE")
    protected Date updatedate;

    public UserRole(){

    }
    public UserRole(Long key){
        this.setId(key);
    }


    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long key) {
        this.id = key;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getRoleid() {
        return roleid;
    }

    public void setRoleid(Long roleid) {
        this.roleid = roleid;
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
