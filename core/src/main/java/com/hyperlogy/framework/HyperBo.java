package com.hyperlogy.framework;

import java.io.Serializable;

public interface HyperBo<K extends Serializable> {
    K getId();

    void setId(K key);
}