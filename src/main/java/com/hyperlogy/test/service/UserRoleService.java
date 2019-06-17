package com.hyperlogy.test.service;

import com.hyperlogy.framework.HyperService;
import com.hyperlogy.test.bo.UserRole;

import java.util.List;

public interface UserRoleService extends HyperService<Long, UserRole> {
    void deleteManyObject(List<UserRole> userRoles);

    public List<UserRole> search(String idUserOrRole, Long idFind);

    public void deleteByIdUserOrRole(String idUserOrRole, Long idFind);

    public void deleteAll();
}
