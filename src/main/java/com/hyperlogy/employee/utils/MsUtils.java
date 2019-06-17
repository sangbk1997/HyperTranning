package com.hyperlogy.employee.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class MsUtils {

    @Autowired
    private MessageSource messageSource;

    public String getMessage(String code, Object[] object, String defaultValue, Locale locale) {
        try {
            String message = this.messageSource.getMessage(code, object, defaultValue, locale);
            return message != null ? message : code;
        } catch (Exception e) {
            return code;
        }
    }

    public String getMessage(String code, Object[] object, String defaultValue){
        return this.getMessage(code,object,defaultValue, LocaleContextHolder.getLocale());
    }

    public String getMessage(String code, Object[] object){
        return this.getMessage(code,object,null);
    }

    public String getMessage(String code, String defaultValue){
        return this.getMessage(code,null,defaultValue);
    }

    public String getMessage(String code){
        return this.getMessage(code,null,null);
    }

    public MessageSource getMessageSource() {
        return messageSource;
    }

    public void setMessageSource(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

}
