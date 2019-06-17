//package com.hyperlogy.test.service;
//
//import com.hyperlogy.framework.AbstractDao;
//import com.hyperlogy.framework.AbstractService;
//import com.hyperlogy.test.bo.Role;
//import com.hyperlogy.test.bo.User;
//import com.hyperlogy.test.bo.UserRole;
//import com.hyperlogy.test.dao.RoleDao;
//import org.hibernate.query.Query;
//import org.springframework.stereotype.Repository;
//
//import javax.persistence.Tuple;
//import javax.persistence.criteria.*;
//import java.util.List;
//
//@Repository
//public class RoleServiceImpl extends AbstractService<Long, Role, RoleDao> implements RoleService {
//
//    @Override
//    public Role doInsert(Role bo) {
//        dao.save(bo);
//        return bo;
//    }
//
//    @Override
//    public Role doUpdate(Role bo) {
//        dao.update(bo);
//        return bo;
//    }
//
//    @Override
//    public Role doDelete(Role bo) {
//        dao.delete(bo);
//        return bo;
//    }
//
//
//    @Override
//    public List<Role> searchRole(String content) {
//        CriteriaBuilder builder = getSession().getCriteriaBuilder();
//        CriteriaQuery<Role> criteriaQuery = builder.createQuery(Role.class);
//        Root<Role> root = criteriaQuery.from(Role.class);
//        criteriaQuery.where(builder.or(builder.like(root.get("rolename"), "%" + content + "%"), builder.like(root.get("code"),"%" + content + "%")));
//        Query<Role> query = getSession().createQuery(criteriaQuery);
//        List<Role> list = query.getResultList();
//        return list;
//    }
//
//    @Override
//    public List<Role> getByCode(String code) {
//        List<Role> list = dao.like("code", code, new Role());
//        return list;
//    }
//
//    @Override
//    public void deleteAll() {
////        List<Role> list = dao.list(new Role());
////        if(list != null && !list.isEmpty()){
////            for(Role r : list){
////                doDelete(r);
////            }
////        }
//
//        dao.deleteAll(new Role());
//    }
//
//
//}