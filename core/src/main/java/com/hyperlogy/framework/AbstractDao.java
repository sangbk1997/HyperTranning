package com.hyperlogy.framework;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

public abstract class AbstractDao<K extends Serializable, T extends HyperBo<K>> implements HyperDao<K, T> {

    protected final Class<T> persistentClass;

    @Autowired
    protected SessionFactory sessionFactory;

    public AbstractDao() {
        this.persistentClass = (Class<T>) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[1];
    }

    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    public T get(K key) {
        T bo = (T) getSession().get(persistentClass, key);
        getSession().clear();
        return bo;
    }

    public List<T> list(T bo) {
        CriteriaBuilder builder = getSession().getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = builder.createQuery(persistentClass);
        Root<T> root = criteriaQuery.from(persistentClass);
        criteriaQuery.select(root);
        Query<T> query = getSession().createQuery(criteriaQuery);
        return query.getResultList();
    }

    public T first(T bo) {
        CriteriaBuilder builder = getSession().getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = builder.createQuery(persistentClass);
        Root<T> root = criteriaQuery.from(persistentClass);
        criteriaQuery.select(root);
        Query<T> query = getSession().createQuery(criteriaQuery);
        return query.getSingleResult();
    }

    public List<T> like(String propertyName, String content, T bo) {
        CriteriaBuilder builder = getSession().getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = builder.createQuery(persistentClass);
        Root<T> root = criteriaQuery.from(persistentClass);
        criteriaQuery.select(root);
        criteriaQuery.where(builder.like(root.get(propertyName), content += "%"));
        Query<T> query = getSession().createQuery(criteriaQuery);
        return query.getResultList();
    }

    public List<T> listPaginate(int position, int pageSize) {
        CriteriaBuilder criteriaBuilder = this.getSession().getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(this.persistentClass);
        Root<T> root = criteriaQuery.from(this.persistentClass);
        criteriaQuery.select(root);
        Query<T> query = getSession().createQuery(criteriaQuery);
        query.setFirstResult(position);
        query.setMaxResults(pageSize);
        return query.getResultList();
    }

    public long countAllUser() {
        CriteriaBuilder criteriaBuilder = this.getSession().getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(this.persistentClass);
        Root<T> root = criteriaQuery.from(this.persistentClass);
        criteriaQuery.select(root);
        Query<T> query = getSession().createQuery(criteriaQuery);
        return query.getResultList().size();
    }

    public T findById(T bo, Long id) {
        CriteriaBuilder builder = getSession().getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = builder.createQuery(persistentClass);
        Root<T> root = criteriaQuery.from(persistentClass);
        criteriaQuery.select(root);
        criteriaQuery.where(builder.equal(root.get("id"), id));
        Query<T> query = getSession().createQuery(criteriaQuery);
        return query.getSingleResult();
    }


    public T equal(T bo, String keyFind, String contentFind) {
        CriteriaBuilder builder = getSession().getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = builder.createQuery(persistentClass);
        Root<T> root = criteriaQuery.from(persistentClass);
        criteriaQuery.select(root);
        criteriaQuery.where(builder.equal(root.get(keyFind), contentFind));
        Query<T> query = getSession().createQuery(criteriaQuery);
        return query.getSingleResult();

    }

    public List<T> equalListById(T bo, String keyFind, long id) {
        CriteriaBuilder builder = getSession().getCriteriaBuilder();
        CriteriaQuery<T> criteriaQuery = builder.createQuery(persistentClass);
        Root<T> root = criteriaQuery.from(persistentClass);
        criteriaQuery.select(root);
        criteriaQuery.where(builder.equal(root.get(keyFind), id));
        Query<T> query = getSession().createQuery(criteriaQuery);

        return query.getResultList();
    }

    ;

    public void save(T bo) {

        getSession().save(bo);
        //getSession().flush();
    }


    public void update(T bo) {
        getSession().update(bo);

    }

    public void delete(T bo) {
        getSession().delete(bo);
        getSession().flush();
        getSession().clear();
    }

    public void deleteAll(T bo) {
        List<T> list = list(bo);
        if (list != null & !list.isEmpty()) {
            for (T t : list) {
                delete(t);
            }
        }
    }


}
