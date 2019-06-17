package com.hyperlogy.test.service;

import com.hyperlogy.framework.AbstractService;
import com.hyperlogy.test.bo.UserRole;
import com.hyperlogy.test.dao.UserRoleDao;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRoleServiceImpl extends AbstractService<Long, UserRole, UserRoleDao> implements UserRoleService {
    @Override
    public UserRole doInsert(UserRole bo) {
        dao.save(bo);
        return bo;
    }

    @Override
    public UserRole doUpdate(UserRole bo) {
        dao.update(bo);
        return bo;
    }

    @Override
    public UserRole doDelete(UserRole bo) {
        dao.delete(bo);
        return bo;
    }


    @Override
    public void deleteManyObject(List<UserRole> userRoles) {
        for(UserRole userRole : userRoles){
            dao.delete(userRole);
        }
    }

    @Override
    public List<UserRole> search(String idUserOrRole, Long idFind) {
        return (List<UserRole>) dao.equalListById(new UserRole(), idUserOrRole, idFind );
    }

    @Override
    public void deleteByIdUserOrRole(String idUserOrRole, Long idFind) {
        List<UserRole> list = search(idUserOrRole, idFind);
        if(list != null && !list.isEmpty()){
            for(UserRole o : list){
                doDelete(o);
            }
        }
    }

    @Override
    public void deleteAll() {
        dao.deleteAll(new UserRole());
    }
}
