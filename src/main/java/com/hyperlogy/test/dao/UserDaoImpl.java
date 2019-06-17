//package com.hyperlogy.test.dao;
//
//import com.hyperlogy.framework.AbstractDao;
//import com.hyperlogy.test.bo.User;
//import org.springframework.stereotype.Repository;
//
//import java.util.ArrayList;
//import java.util.List;
//
//
//@Repository
//public class UserDaoImpl extends AbstractDao<Long, User> implements UserDao {
//
//    private List<User> cleanUpUser(List<User> userMain ,List<User> userSub ){
//        List<User> userClear = new ArrayList<User>();
//        for(User userMain1 : userMain){
//            for(User userSub1 : userSub){
//                if(userSub1 == userMain1) {
//                    userClear.add(userSub1);
//                    userSub.remove(userSub1);
//                    break;
//                }
//
//            }
//
//        }
//        return userClear;
//    }
//
//    @Override
//    public List<User> listLike(User bo) {
//        List<User> userMain = new ArrayList<>();
//        if(bo.getCode() != null){
//            userMain.addAll(like("code", bo.getCode(), bo));
//        }
//        if(bo.getFullname() != null ){
//            List<User> users = like("fullname", bo.getFullname(), bo);
//            if(userMain.size() == 0){
//                userMain.addAll(users);
//            }else{
//                userMain = cleanUpUser(userMain, users);
//            }
//        }
//        if(bo.getEmail() != null  ){
//            List<User> users = like("email", bo.getEmail(), bo);
//            if(userMain.size() == 0){
//                userMain.addAll(users);
//            }else{
//                userMain = cleanUpUser(userMain, users);
//            }
//        }
//
//        return userMain;
//    }
//
//    @Override
//    public User loadUserByUsername(String username) {
//
//        return this.equal(new User(), "username", username);
//    }
//}
