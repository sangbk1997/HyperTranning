package com.hyperlogy.test.dao;

import com.hyperlogy.framework.AbstractDao;
import com.hyperlogy.test.bo.UserRole;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class UserRoleDaoImpl extends AbstractDao<Long, UserRole> implements UserRoleDao {

    @Override
    public List<UserRole> listLike(UserRole bo) {
        return null;
    }
}
