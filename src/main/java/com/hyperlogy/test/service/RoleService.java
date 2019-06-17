package com.hyperlogy.test.service;

import com.hyperlogy.framework.HyperService;
import com.hyperlogy.test.bo.Role;




import java.util.List;

public interface RoleService extends HyperService<Long, Role> {

    public List<Role> searchRole(String content);

    public List<Role> getByCode(String code);

    public void deleteAll();

}
