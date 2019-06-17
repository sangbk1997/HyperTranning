//package com.hyperlogy.test.service;
//
//import com.hyperlogy.framework.AbstractService;
//import com.hyperlogy.test.bo.User;
//
//import com.hyperlogy.test.dao.UserDao;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//
//@Service
//public class UserServiceImpl extends AbstractService<Long, User, UserDao> implements UserService, UserDetailsService {
//
//
//    @Autowired
//    private UserDao userDao;
//
//    @Override
//    public User doInsert(User bo) {
//        System.out.println("password : "+bo.getPassword());
//        dao.save(bo);
//        return bo;
//    }
//
//    @Override
//    public User doUpdate(User bo) {
//
//        User user = this.get(bo);
//
//        if(bo.getCode() == ""){
//            bo.setCode(user.getCode());
//        }
//        if(bo.getUsername() == ""){
//            bo.setUsername(user.getUsername());
//        }
//        if(bo.getEmail() == ""){
//            bo.setEmail(user.getEmail());
//        }
//        if(bo.getFullname() == ""){
//            bo.setFullname(user.getFullname());
//        }
//        if(bo.getPosition() == ""){
//            bo.setPosition(user.getPosition());
//        }
//
//
//        dao.update(bo);
//        return bo;
//    }
//
//    @Override
//    public User doDelete(User bo) {
//        dao.delete(bo);
//        return bo;
//    }
//
//
//    @Override
//    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
//        User user = userDao.loadUserByUsername(s);
//        if(user == null) {
//            return null;
//        }
//
////        boolean enabled = true;
////        boolean accountNonExpired = true;
////        boolean credentialsNonExpired = true;
////        boolean accountNonLocked = true;
//        return (UserDetails) new User(s, user.getPassword());
//    }
//
//    @Override
//    public User getByUsername(String username) {
//        return dao.equal(new User(), "username", username);
//    }
//}
