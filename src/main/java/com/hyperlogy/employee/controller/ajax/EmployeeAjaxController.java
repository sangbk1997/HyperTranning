package com.hyperlogy.employee.controller.ajax;

import com.hyperlogy.employee.EmployeeFind;
import com.hyperlogy.employee.bo.Employee;
import com.hyperlogy.employee.common.AjaxResponse;
import com.hyperlogy.employee.common.AjaxStatus;
import com.hyperlogy.employee.service.EmployeeService;
import com.hyperlogy.employee.utils.ErrorUtils;
import com.hyperlogy.employee.utils.MsUtils;
import com.hyperlogy.employee.validation.InsertUserValidation;
import com.hyperlogy.employee.validation.UpdateUserValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/ajax/employee")
public class EmployeeAjaxController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private InsertUserValidation insertUserValidation;

    @Autowired
    private UpdateUserValidation updateUserValidation;

    @Autowired
    private MsUtils msUtils;

    @GetMapping
    public AjaxResponse getAllEmployee() {
        AjaxResponse ajaxResponse = new AjaxResponse(AjaxStatus.SUCCESS);
        ajaxResponse.putSingleData("employees", employeeService.list(new Employee()));
        return ajaxResponse;
    }

    @GetMapping("/count")
    public AjaxResponse countAllEmployee() {
        AjaxResponse ajaxResponse = new AjaxResponse(AjaxStatus.SUCCESS);
        ajaxResponse.putSingleData("totalEmployee", employeeService.countAllUser());
        return ajaxResponse;
    }

    @GetMapping("/paginate/{position}/{pageSize}")
    public AjaxResponse getPaginateEmployee(@PathVariable("position") int position, @PathVariable("pageSize") int pageSize) {
        AjaxResponse ajaxResponse = new AjaxResponse(AjaxStatus.SUCCESS);
        ajaxResponse.putSingleData("employees", employeeService.listPaginate(position, pageSize));
        return ajaxResponse;
    }

    @PostMapping
    public AjaxResponse insertEmployee(@RequestBody Employee employee, BindingResult bindingResult) {
        AjaxResponse ajaxResponse = new AjaxResponse(AjaxStatus.DANGER);
        insertUserValidation.validate(employee, bindingResult);
        if (bindingResult.hasErrors()) {
            ajaxResponse.putSingleData("errors", ErrorUtils.detectErrors(bindingResult, msUtils));
        } else {
            ajaxResponse.setStatus(AjaxStatus.SUCCESS);
            employeeService.doInsertEmployee(employee);
        }
        employeeService.listLike(employee);
        return ajaxResponse;
    }

    @PostMapping("/update")
    public AjaxResponse updateEmployee(@RequestBody Employee employee, BindingResult bindingResult) {
        AjaxResponse ajaxResponse = new AjaxResponse(AjaxStatus.DANGER);
        updateUserValidation.validate(employee, bindingResult);
        if (bindingResult.hasErrors()) {
            ajaxResponse.putSingleData("errors", ErrorUtils.detectErrors(bindingResult, msUtils));
        } else {
            ajaxResponse.setStatus(AjaxStatus.SUCCESS);
            employeeService.doUpdateEmployee(employee);
        }
        return ajaxResponse;
    }

    @PostMapping("/delete")
    public AjaxResponse deleteEmployee(@RequestBody Employee employee) {
        AjaxResponse ajaxResponse = new AjaxResponse(AjaxStatus.SUCCESS);
        employeeService.doDeleteEmployee(employee);
        return ajaxResponse;
    }

    @PostMapping("/find")
    public AjaxResponse findByCodeAndName(@RequestBody EmployeeFind object) {
        AjaxResponse ajaxResponse = new AjaxResponse(AjaxStatus.SUCCESS);
        ajaxResponse.putSingleData("employeeSearch", employeeService.findByCodeAndName(object.getCode(), object.getFullName()));
        return ajaxResponse;
    }

    @PostMapping("/upload")
    public AjaxResponse uploadFile(@RequestParam("uploadFile") MultipartFile multipartFile) {
        AjaxResponse ajaxResponse = new AjaxResponse(AjaxStatus.SUCCESS);
        String fileName = multipartFile.getOriginalFilename();
        File file1 = new File("D:/java_training_project/training_basic/src/main/webapp/static/employee/img", fileName);
        try {
            multipartFile.transferTo(file1);
        } catch (IOException e) {
            ajaxResponse.setStatus(AjaxStatus.DANGER);
            Map<String, Set<String>> errors = new HashMap<>();
            ajaxResponse.putSingleData("errors", errors);
            e.printStackTrace();
        }
        return ajaxResponse;
    }
}
