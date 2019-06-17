package com.hyperlogy.framework;

import org.hibernate.query.Query;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.io.Serializable;
import java.util.List;


public interface HyperDao<K extends Serializable, T extends HyperBo<K>> {

    T get(K key);

    List<T> list(T bo);

    T first(T bo);

    List<T> like(String propertyName, String content, T bo);

    List<T> listPaginate(int position, int pageSize);

    List<T> listLike(T bo);

    long countAllUser();

    T findById(T bo, Long id);

    T equal(T bo, String keyFind, String contentFind);

    List<T> equalListById(T bo, String keyFind, long id);

    void save(T bo);

    void update(T bo);

    void delete(T bo);

    void deleteAll(T bo);


}
