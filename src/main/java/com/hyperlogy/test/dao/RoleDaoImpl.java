//package com.hyperlogy.test.dao;
//
//import com.hyperlogy.framework.AbstractDao;
//import com.hyperlogy.framework.HyperDao;
//import com.hyperlogy.test.bo.Role;
//import com.hyperlogy.test.bo.User;
//import org.hibernate.query.Query;
//import org.springframework.stereotype.Repository;
//
//import javax.persistence.criteria.CriteriaBuilder;
//import javax.persistence.criteria.CriteriaQuery;
//import javax.persistence.criteria.Root;
//import java.util.List;
//
//@Repository
//public class RoleDaoImpl extends AbstractDao<Long, Role> implements RoleDao {
////
////    @Override
////    public List<Role> searchRole(String content) {
////        CriteriaBuilder builder = getSession().getCriteriaBuilder();
////        CriteriaQuery<Role> criteriaQuery = builder.createQuery(Role.class);
////        Root<Role> root = criteriaQuery.from(Role.class);
////        criteriaQuery.where(builder.or(builder.like(root.get("rolename"), "%" + content + "%" ), builder.like(root.get("code"), "%" + content + "%")));
////        Query<Role> query = getSession().createQuery(criteriaQuery);
////        List<Role> list = query.getResultList();
////        return list;
////    }
////
////    @Override
////    public List<Role> getByCode(String code) {
////        CriteriaBuilder builder = getSession().getCriteriaBuilder();
////        CriteriaQuery<Role> criteriaQuery = builder.createQuery(Role.class);
////        Root<Role> root = criteriaQuery.from(Role.class);
////        criteriaQuery.where(builder.like(root.get("code"), "%" + code  + "%"));
////        Query<Role> query = getSession().createQuery(criteriaQuery);
////        List<Role> list = query.getResultList();
////        return list;
////    }
//
//
//    @Override
//    public List<Role> listLike(Role bo) {
//        return null;
//    }
//}
