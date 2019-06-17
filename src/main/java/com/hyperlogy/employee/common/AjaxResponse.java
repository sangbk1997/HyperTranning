package com.hyperlogy.employee.common;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class AjaxResponse {
    private AjaxStatus status;
    private Map<String, Object> data;

    public AjaxResponse(AjaxStatus status) {
        this.status = status;
    }

    public AjaxStatus getStatus() {
        return status;
    }

    public void setStatus(AjaxStatus status) {
        this.status = status;
    }

    public Map<String, Object> getData() {
        if (Objects.isNull(data)) {
            this.data = new HashMap<>();
        }
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public void putSingleData(String name, Object object) {
        this.getData().put(name, object);
    }
}
