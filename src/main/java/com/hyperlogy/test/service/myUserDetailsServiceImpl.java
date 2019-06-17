//package com.hyperlogy.test.service;
//
//import com.hyperlogy.test.bo.Role;
//import com.hyperlogy.test.bo.User;
//import com.hyperlogy.test.bo.UserRole;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//import java.util.ArrayList;
//import java.util.List;
//
//public class myUserDetailsServiceImpl implements UserDetailsService {
//
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private RoleService roleService;
//
//    @Autowired
//    private UserRoleService userRoleService;
//
//    @Override
//    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
//        User user = userService.getByUsername(s);
//        if(user == null){
//            System.out.println("Not Found user with username : " +s);
//            throw new UsernameNotFoundException("Not Found User");
//        }
//
//        System.out.println("Found User : " + user);
//        System.out.println("Username : " + user.getUsername());
//        System.out.println("Password : " + user.getPassword());
//
//        List<UserRole> list = userRoleService.search("userid", user.getId());
//        List<GrantedAuthority> grantedAuthorityList = new ArrayList<GrantedAuthority>();
//        if(list != null && !list.isEmpty()){
//            for (UserRole userRole : list){
//                Role role = roleService.get(new Role(userRole.getRoleid()));
//                if(role != null){
//                    String roleName = role.getRolename();
//                    GrantedAuthority authority = new SimpleGrantedAuthority(roleName);
//                    grantedAuthorityList.add(authority);
//                }
//            }
//        }
//
//        UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), grantedAuthorityList);
//        return userDetails;
//    }
//}
