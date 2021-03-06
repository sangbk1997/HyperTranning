package com.hyperlogy.framework;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.util.List;

public abstract class AbstractService<K extends Serializable, T extends HyperBo<K>, D extends HyperDao<K, T>> implements HyperService<K, T> {

    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    protected D dao;


    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    @Override
    public T get(T bo) {
        return dao.get(bo.getId());
    }

    @Override
    public List<T> list(T bo) {
        return dao.list(bo);
    }

    @Override
    public T first(T bo) {
        return dao.first(bo);
    }

    @Override
    public List<T> like(String propertyName, String content, T bo) {
        return dao.like(propertyName, content, bo);
    }

    public List<T> listLike(T bo) {
        return dao.listLike(bo);
    }

    @Override
    public long countAllUser() {
        return dao.countAllUser();
    }

    public T findById(T bo, Long id) {
        return dao.findById(bo, id);
    }

    ;

    public void doInsertMany(List<T> listBo) {
        for (T t : listBo) {
            dao.save(t);
        }
    }

    ;

    public T equal(T bo, String keyFind, String contentFind) {
        return dao.equal(bo, keyFind, contentFind);
    }

    public List<T> equalListById(T bo, String keyFind, long id) {

        return dao.equalListById(bo, keyFind, id);
    }

    ;


    public void deleteAll(T bo) {
        dao.deleteAll(bo);
    }

    public List<T> listPaginate(int position, int pageSize) {
        return dao.listPaginate(position, pageSize);
    }

}
