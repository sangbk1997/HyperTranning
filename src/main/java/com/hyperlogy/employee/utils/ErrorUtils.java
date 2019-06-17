package com.hyperlogy.employee.utils;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.*;

public class ErrorUtils {

    public static Map<String, Set<String>> detectErrors(BindingResult bindingResult, MsUtils msUtils) {
        Map<String, Set<String>> errors = new HashMap<>();

        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            String fileError = fieldError.getField();
            Set<String> error = errors.get(fileError);

            if (Objects.isNull(error)) {
                error = new LinkedHashSet<>();
                errors.put(fieldError.getField(), error);
            }
            error.add(msUtils.getMessage(fieldError.getCode(), fieldError.getArguments()));
        }
        return errors;
    }
}
