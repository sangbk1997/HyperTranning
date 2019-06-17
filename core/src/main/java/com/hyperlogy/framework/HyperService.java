package com.hyperlogy.framework;

import java.io.Serializable;
import java.util.List;


public interface HyperService<K extends Serializable, T extends HyperBo<K>> {

    T get(T bo);

    List<T> list(T bo);

    T first(T bo);

    List<T> like(String propertyName, String content, T bo);

    List<T> listLike(T bo);

    long countAllUser();

    T equal(T bo, String keyFind, String contentFind);

    List<T> equalListById(T bo, String keyFind, long id);

    T findById(T bo, Long id);

    T doInsert(T bo);

    T doUpdate(T bo);

    T doDelete(T bo);

    List<T> listPaginate(int position,int pageSize);

    void doInsertMany(List<T> listBo);

    void deleteAll(T bo);
}