package com.hyperlogy.employee.dao.impl;

import com.hyperlogy.employee.bo.Employee;
import com.hyperlogy.employee.dao.EmployeeDao;
import com.hyperlogy.framework.AbstractDao;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class EmployeeDaoImpl extends AbstractDao<Integer, Employee> implements EmployeeDao {

    @Override
    public Employee findByCode(String propertyName, String content) {

        CriteriaBuilder builder = getSession().getCriteriaBuilder();
        CriteriaQuery<Employee> criteriaQuery = builder.createQuery(persistentClass);
        Root<Employee> root = criteriaQuery.from(persistentClass);
        criteriaQuery.select(root);
        criteriaQuery.where(builder.like(root.get(propertyName), content += "%"));
        Query<Employee> query = getSession().createQuery(criteriaQuery);
        List<Employee> employees = query.getResultList();
        return employees.size() > 0 ? employees.get(0) : null;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Employee> findByCodeAndName(String code, String fullName) {
        String queryString = "FROM Employee e " +
                "WHERE e.code = :code "+
                "  AND CONCAT(e.firstName, ' ', e.lastName) LIKE :fullName";
        Query<Employee> query = this.getSession()
                .createQuery(queryString, Employee.class)
                .setParameter("code", code)
                .setParameter("fullName", "%" + fullName + "%");

        return query.getResultList();
    }

    @Override
    public List<Employee> listLike(Employee bo) {
        return null;
    }

}
