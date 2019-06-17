//package com.hyperlogy.test.bo;
//
//import com.hyperlogy.framework.HyperBo;
//import org.hibernate.annotations.Cache;
//import org.hibernate.annotations.CacheConcurrencyStrategy;
//import org.springframework.security.core.GrantedAuthority;
//
//import javax.persistence.*;
//import java.sql.Date;
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//@Cache(usage = CacheConcurrencyStrategy.TRANSACTIONAL)
//@Table(name = "TBL_USER")
//public class User implements HyperBo<Long> {
//    @Id
////  @GeneratedValue(generator = "uuid")
////  @GenericGenerator(name = "uuid", strategy = "uuid2")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "ID")
//    protected Long id;
//    @Column(name = "CODE")
//    protected String code;
//    @Column(name = "USERNAME")
//    protected String username;
//    @Column(name = "PASSWORD")
//    protected String password;
//    @Column(name = "EMAIL")
//    protected String email;
//    @Column(name = "FULLNAME")
//    protected String fullname;
//    @Column(name = "POSITION")
//    protected String position;
//    @Column(name = "CREATEBY")
//    protected Long createby;
//    @Column(name = "CREATEDATE")
//    protected Date createdate;
//    @Column(name = "UPDATEBY")
//    protected Long updateby;
//    @JoinColumn(name = "UPDATEDATE")
//    protected Date updatedate;
//
//    @Transient
//    protected String validateException;
//
////    @Transient
////    private Boolean enabled;
////    @Transient
////    private Set<UserRole> userRole = new HashSet<>();
//
//
//
//    public User() {
//    }
//
//    public User(Long id) {
//        setId(id);
//    }
//
//    public User(final String username, final String password) {
//        this.username = username;
//        this.password = password;
////        this.enabled = enabled;
////        this.userRole = userRole;
//    }
//
//    public User(String code, String username, String password, String email, String fullname, String position){
//        this.code = code;
//        this.username = username;
//        this.password = password;
//        this.email = email;
//        this.fullname = fullname;
//        this.position = position;
//
//    }
//
//    @Override
//    public Long getId() {
//        return id;
//    }
//
//    @Override
//    public void setId(Long key) {
//        this.id = key;
//    }
//
//    @Transient
//    public String getValidateException() {
//        return validateException;
//    }
//    @Transient
//    public void setValidateException(String validateException) {
//        this.validateException = validateException;
//    }
//
//    public String getCode() {
//        return code;
//    }
//
//    public void setCode(String code) {
//        this.code = code;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getFullname() {
//        return fullname;
//    }
//
//    public void setFullname(String fullname) {
//        this.fullname = fullname;
//    }
//
//    public String getPosition() {
//        return position;
//    }
//
//    public void setPosition(String position) {
//        this.position = position;
//    }
//
//    public Long getCreateby() {
//        return createby;
//    }
//
//    public void setCreateby(Long createby) {
//        this.createby = createby;
//    }
//
//    public Long getUpdateby() {
//        return updateby;
//    }
//
//    public void setUpdateby(Long updateby) {
//        this.updateby = updateby;
//    }
//
//    public Date getCreatedate() {
//        return createdate;
//    }
//
//    public void setCreatedate(Date createdate) {
//        this.createdate = createdate;
//    }
//
//    public Date getUpdatedate() {
//        return updatedate;
//    }
//
//    public void setUpdatedate(Date updatedate) {
//        this.updatedate = updatedate;
//    }
//
//
//    @Transient
//    public List<GrantedAuthority> getAuthorities() {
//        List<GrantedAuthority> authorities = new ArrayList<>();
////        for (UserRole usersRoles: usersRoleses) {
////            authorities.add(new SimpleGrantedAuthority(usersRoles.getRole().getName()));
////        }
//        return authorities;
//    }
//}
