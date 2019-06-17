//package com.hyperlogy.test.controller;
//
//
//import com.hyperlogy.test.bo.Role;
//import com.hyperlogy.test.bo.UserRole;
//import com.hyperlogy.test.service.RoleService;
//import com.hyperlogy.test.service.UserRoleService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.controller.bind.annotation.*;
//
//import java.security.Principal;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Controller
//public class RoleController {
//
//    @Autowired
//    private RoleService roleService;
//
//    @Autowired
//    private UserRoleService userRoleService;
//
//    @GetMapping("/rolePage")
//    public String getRolePage(Model model, Principal principal){
//        StringBuilder userInfo = new StringBuilder();
//        if(principal != null){
//            userInfo.append("User : " + principal.getName());
//        }else{
//            userInfo.append("User : NULL ");
//        }
//        model.addAttribute("userInfo", userInfo);
//        return "user/rolePage";
//    }
//
//    @GetMapping("/roles")
//    @ResponseBody
//    public List<Role> getList(){
//       return roleService.list(new Role());
//    }
//
//
//    @GetMapping("/role/{id}")
//    @ResponseBody
//    public Role getById(@PathVariable(value = "id") Long id){
//        return roleService.get(new Role(id));
//    }
//
//    @PostMapping("/insertRole")
//    @ResponseBody
//    public Map<String, String> insertRole(@RequestBody Role role) {
//        Map<String, String> object = new HashMap<String, String>();
//        if(roleService.getByCode(role.getCode()).size() > 0 || role.getRolename().length() == 0){
//            object.put("message", "0");
//            return object;
//        }
//        roleService.doInsert(role);
//        object.put("message", "1");
//        return object;
//    }
//
//    @PutMapping("/updateRole")
//    @ResponseBody
//    public Map<String, String > updateRole(@RequestBody Role role) {
//        Map<String, String> object = new HashMap<String, String>();
//        if(role.getRolename().length() > 0){
//            roleService.doUpdate(role);
//            object.put("message", "1");
//            return object;
//        }
//        object.put("message", "0");
//        return object;
//
//
//    }
//
//    @DeleteMapping("/role/{id}")
//    @ResponseBody
//    public void deleteRole(@PathVariable(value = "id") Long id){
//        userRoleService.deleteByIdUserOrRole("roleid", id);
//        roleService.doDelete(new Role(id));
//    }
//
//    @DeleteMapping("/deleteAll")
//    @ResponseBody
//    public void deleteAll(){
////        List<Role> list = roleService.list(new Role());
////        if(list != null && !list.isEmpty()){
////            for(Role role : list){
////                userRoleService.deleteByIdUserOrRole("roleid", role.getId());
////            }
////        }
//
//        userRoleService.deleteAll();
//        roleService.deleteAll();
//    }
//
//
//    @GetMapping("/searchRole")
//    @ResponseBody
//    public List<Role> searchRole(@RequestParam("search") String search){
//        return  roleService.searchRole(search);
//    }
//
//
//    @GetMapping("/getByCode")
//    @ResponseBody
//    public List<Role> getByCode(@RequestParam("code") String code){
//        return  roleService.getByCode(code);
//    }
//
//    @GetMapping("/getUserRole")
//    @ResponseBody
//    public List<UserRole> getUserRoles(@RequestParam("roleId") Long roleId){
//        return userRoleService.search("roleid", roleId);
//    }
//
//}
