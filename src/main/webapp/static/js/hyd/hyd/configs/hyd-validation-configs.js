/**
 * Created by nhandh_vdi on 9/14/2016.
 */
var validationConfig = {
    goals: {
        doQuickUpdate: [
            {
                property: 'completePercent',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.update.complete.percent.required'
            },
            {
                property: 'completePercent',
                command: 'percentExtend',
                commandValue: undefined,
                errMsg: 'error.goal.update.complete.percent.invalid'
            },
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.name.required'
            },
            {
                property: 'weight',
                command: 'decimalPercent',
                commandValue: undefined,
                errMsg: 'error.goal.weight.invalid'
            },
            {
                property: 'target',
                command: 'decimal',
                commandValue: undefined,
                errMsg: 'error.goal.kpi.value.invalid'
            },
            {
                property: 'actual',
                command: 'decimal',
                commandValue: undefined,
                errMsg: 'error.goal.kpi.value.invalid'
            }
        ],
        doUpdateKrCompletePercent: [
            {
                property: 'completePercent',
                command: 'percentExtend',
                commandValue: undefined,
                errMsg: 'error.goal.update.complete.percent.invalid'
            }
        ],
        doUpdateGoalCompletePercent: [
            {
                property: 'completePercent',
                command: 'percentExtend',
                commandValue: undefined,
                errMsg: 'error.goal.update.complete.percent.invalid'
            }
        ],
        doInsert: [
            {
                property: 'empId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.employeeId.required'
            },
            {
                property: 'comId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.companyId.required'
            },
            {
                property: 'planId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.planId.required'
            },
            {
                property: 'sharingId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.sharingId.required'
            },
            {
                property: 'categoryId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.categoryId.required'
            },
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.name.required'
            },
            {
                property: 'kpiName',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.kpi.name.required'
            },
            {
                property: 'weight',
                command: 'decimalPercent',
                commandValue: undefined,
                errMsg: 'error.goal.weight.invalid'
            },
            {
                property: 'startDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.startDate.required'
            },
            {
                property: 'dueDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.dueDate.required'
            },
            {
                property: 'dueDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.endDate.gte.to.startDate'
            },
            {
                property: 'frequency',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.kpi.library.frequency.required'
            },
            {
                property: 'valueType',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.kpi.library.valueType.required'
            },
            {
                property: 'unitString',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.kpi.library.unit.required'
            }
        ],
        doCopy: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.name.required'
            },
            {
                property: 'startDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.startDate.required'
            },
            {
                property: 'dueDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.dueDate.required'
            },
            {
                property: 'dueDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.endDate.gte.to.startDate'
            }
        ]
        // doUpdateGoalKpiData: [
        //     {
        //         property: 'kpiValue',
        //         command: 'required',
        //         commandValue: undefined,
        //         errMsg: 'error.goal.kpi.value.invalid'
        //     }, {
        //         property: 'kpiTarget',
        //         command: 'required',
        //         commandValue: undefined,
        //         errMsg: 'error.goal.kpi.value.invalid'
        //     }
        // ]
    },
    working: {
        doQuickUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.working.name.required'
            }
        ],
        doInsert: [
            {
                property: 'empId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.working.empId.required'
            },
            {
                property: 'goalId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.working.goalId.required'
            },
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.working.name.required'
            },
            {
                property: 'startDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.working.startDate.required'
            },
            {
                property: 'dueDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.working.dueDate.required'
            },
            {
                property: 'dueDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.endDate.gte.to.startDate'
            }
        ],
        doInsertField: [
            {
                property: 'title',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.working.library.field.title.required'
            }
        ],
        doInsertLibrary: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.working.library.name.required'
            }
        ],
        doUpdateCompletePercent: [
            {
                property: 'completePercent',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.working.complete.percent.required'
            },
            {
                property: 'completePercent',
                command: 'percent',
                commandValue: undefined,
                errMsg: 'error.goal.key.result.update.complete.percent.invalid'
            }
        ]
    },
    company: {
        doInsert: [
            {
                property: 'code',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.company.code.required'
            },
            {
                property: 'code',
                command: 'alphanumericExtend',
                commandValue: undefined,
                errMsg: 'error.company.code.invalid'
            },
            {
                property: 'parentId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.company.parentId.required'
            },
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.company.name.required'
            }
        ]
    },
    employee: {
        doInsert: [
            {
                property: 'code',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.employee.code.required'
            },
            {
                property: 'code',
                command: 'alphanumericExtend',
                commandValue: undefined,
                errMsg: 'error.employee.code.invalid'
            },
            {
                property: 'lastName',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.employee.lastName.required'
            },
            {
                property: 'firstName',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.employee.firstName.required'
            },
            {
                property: 'email',
                command: 'email',
                commandValue: undefined,
                errMsg: 'error.employee.email.invalid'
            },
            {
                property: 'user.username',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.employee.account.name.required'
            }
        ]
    },
    password: {
        doChangePassword: [
            {
                property: 'oldPassword',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.user.password.required'
            },
            {
                property: 'newPassword',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.user.new.password.required'
            },
            {
                property: 'newPassword',
                command: 'minlengthValue',
                commandValue: 8,
                errMsg: 'error.user.new.password.incorrect'
            },
            {
                property: 'rePassword',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.user.password.retype.required'
            },
            {
                property: 'rePassword',
                command: 'equalValue',
                commandValue: 'newPassword',
                errMsg: 'error.user.password.retype.not.equal'
            }
        ]
    },
    rap: {
        form: {
            doInsert: [
                {
                    property: 'name',
                    command: 'required',
                    commandValue: undefined,
                    errMsg: 'error.rap.form.name.required'
                },
                {
                    property: 'categoryId',
                    command: 'required',
                    commandValue: undefined,
                    errMsg: 'error.rap.form.categoryId.required'
                }
            ],
            doUpdate: [
                {
                    property: 'name',
                    command: 'required',
                    commandValue: undefined,
                    errMsg: 'error.rap.form.name.required'
                },
                {
                    property: 'categoryId',
                    command: 'required',
                    commandValue: undefined,
                    errMsg: 'error.rap.form.categoryId.required'
                }
            ]
        },
        action: {
            doInsert: [
                {
                    property: 'name',
                    command: 'required',
                    commandValue: undefined,
                    errMsg: 'error.rap.action.name.required'
                }
            ],
            doUpdate: [
                {
                    property: 'name',
                    command: 'required',
                    commandValue: undefined,
                    errMsg: 'error.rap.action.name.required'
                }
            ]
        },
        stage: {
            doInsert: [
                {
                    property: 'name',
                    command: 'required',
                    commandValue: undefined,
                    errMsg: 'error.rap.stage.name.required'
                }
            ],
            doUpdate: [
                {
                    property: 'name',
                    command: 'required',
                    commandValue: undefined,
                    errMsg: 'error.rap.stage.name.required'
                }
            ]
        },
        formField: {
            doInsert: [
                {
                    property: 'title',
                    command: 'required',
                    commandValue: undefined,
                    errMsg: 'error.rap.form.field.title.required'
                }
            ],
            doUpdate: [
                {
                    property: 'title',
                    command: 'required',
                    commandValue: undefined,
                    errMsg: 'error.rap.form.field.title.required'
                }
            ]
        }
    },
    rapFormInfo: {
        doCancel: [
            {
                property: 'reason',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.form.info.reason.required'
            }
        ]
    },
    relation: {
        insertRelation: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'ihcm.relation.name.error'
            }
        ],
        insertEmpRelation: [
            {
                property: 'memberId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'ihcm.relation.validation.emptyMember'
            }
        ]
    },
    kpiLibrary: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.kpi.library.name.required'
            },
            {
                property: 'frequency',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.kpi.library.frequency.required'
            },
            {
                property: 'valueType',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.kpi.library.valueType.required'
            },
            {
                property: 'unitString',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.kpi.library.unit.required'
            }
        ]

    },
    goalLibrary: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.kpi.library.name.required'
            }
        ],
        doInsertGoalLibraryGroup: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.kpi.library.name.required'
            },
            {
                property: 'goalLibraryGroupId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.kpi.library.name.required'
            }
        ]

    },
    dateRange: {
        update: [
            {
                property: 'startDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.working.startDate.required'
            },
            {
                property: 'endDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.working.dueDate.required'
            },
            {
                property: 'endDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.endDate.gte.to.startDate'
            }
        ],
        updateNoRequire: [
            {
                property: 'endDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.endDate.gte.to.startDate'
            }
        ]
    },
    emailMarketing: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.marketing.name.required'
            },
            {
                property: 'groupId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.marketing.groupid.required'
            },
            {
                property: 'filterId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.marketing.filterid.required'
            },
            {
                property: 'newsletterId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.marketing.newsletter.required'
            },
            {
                property: 'alertTimeInfoDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.marketing.alert.time.required'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.marketing.name.required'
            },
            {
                property: 'groupId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.marketing.groupid.required'
            },
            {
                property: 'filterId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.marketing.filterid.required'
            },
            {
                property: 'newsletterId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.marketing.newsletter.required'
            },
            {
                property: 'alertTimeInfoDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.marketing.alert.time.required'
            }
        ]
    },
    emailTesting: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.marketing.name.required'
            },
            {
                property: 'filterId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.marketing.filterid.required'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.marketing.name.required'
            },
            {
                property: 'filterId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.marketing.filterid.required'
            }
        ]
    },
    goalKeyResult: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.key.result.name.required'
            },
            {
                property: 'weight',
                command: 'decimalPercent',
                commandValue: undefined,
                errMsg: 'error.goal.key.result.weight.invalid'
            },
            {
                property: 'dueDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.endDate.gte.to.startDate'
            }
        ],
        doQuickUpdate: [
            {
                property: 'completePercent',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.key.result.update.complete.percent.required'
            },
            {
                property: 'completePercent',
                command: 'percent',
                commandValue: undefined,
                errMsg: 'error.goal.key.result.update.complete.percent.invalid'
            },
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.key.result.name.required'
            },
            {
                property: 'weight',
                command: 'decimalPercent',
                commandValue: undefined,
                errMsg: 'error.goal.key.result.weight.invalid'
            }
        ]

    },
    feedback: {
        doRequestUpgrade: [
            {
                property: 'request',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.feedback.request.required'
            },
            {
                property: 'email',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.feedback.email.required'
            },
            {
                property: 'email',
                command: 'email',
                commandValue: undefined,
                errMsg: 'error.feedback.email.invalid'
            },
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.feedback.fullname.required'
            },
            {
                property: 'content',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.feedback.content.required'
            }
        ]

    },
    navSearch: [
        {
            property: 'name',
            command: 'required',
            commandValue: undefined,
            errMsg: 'error.nav.search.required'
        },
        {
            property: 'empId',
            command: 'required',
            commandValue: undefined,
            errMsg: 'error.nav.search.empId.required'
        },
        {
            property: 'name',
            command: 'minlengthValue',
            commandValue: 3,
            errMsg: 'error.nav.search.minlength'
        }

    ],
    contact: {
        doInsert: [
            {
                property: 'email',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.email.required'
            },
            {
                property: 'email',
                command: 'email',
                commandValue: undefined,
                errMsg: 'error.contact.email.invalid'
            },
            {
                property: 'fullName',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.fullname.required'
            },
            {
                property: 'stageId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.stage.required'
            },
            {
                property: 'statusProcessId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.process.required'
            }
        ],
        doUpdate: [
            {
                property: 'email',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.email.required'
            },
            {
                property: 'email',
                command: 'email',
                commandValue: undefined,
                errMsg: 'error.contact.email.invalid'
            },
            {
                property: 'fullName',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.fullname.required'
            }
        ]

    },
    alertFolder: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.alertFolder.name.required'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.alertFolder.name.required'
            }
        ]
    },
    contactStage: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contactStage.name.required'
            },
            {
                property: 'priority',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contactStage.priority.required'
            },
            {
                property: 'priority',
                command: 'numeric',
                commandValue: undefined,
                errMsg: 'error.contactStage.priority.integer'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contactStage.name.required'
            },
            {
                property: 'priority',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contactStage.priority.required'
            },
            {
                property: 'priority',
                command: 'numeric',
                commandValue: undefined,
                errMsg: 'error.contactStage.priority.integer'
            }
        ]
    },
    contactProcess: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contactProcess.name.required'
            },
            {
                property: 'priority',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contactProcess.priority.required'
            },
            {
                property: 'priority',
                command: 'numeric',
                commandValue: undefined,
                errMsg: 'error.contactProcess.priority.integer'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contactProcess.name.required'
            },
            {
                property: 'priority',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contactProcess.priority.required'
            },
            {
                property: 'priority',
                command: 'numeric',
                commandValue: undefined,
                errMsg: 'error.contactProcess.priority.integer'
            }
        ]
    },
    contactActionStage: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contactActionStage.name.required'
            },
            {
                property: 'stageId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contactActionStage.stageId.required'
            },
            {
                property: 'service',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contactActionStage.service.required'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contactActionStage.name.required'
            },
            {
                property: 'stageId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contactActionStage.stageId.required'
            },
            {
                property: 'service',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contactActionStage.service.required'
            }
        ]
    },
    contactActivity: {
        doInsert: [
            {
                property: 'actionType',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.activity.actionType.required'
            },
            {
                property: 'title',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.activity.title.required'
            },
            {
                property: 'actionDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.activity.actionDate.required'
            },
            {
                property: 'endDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.activity.endDate.required'
            },
            {
                property: 'endDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'actionDate',
                errMsg: 'error.endDate.gte.to.actionDate'
            }

        ],
        doUpdate: [
            {
                property: 'actionType',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.activity.actionType.required'
            },
            {
                property: 'title',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.activity.title.required'
            },
            {
                property: 'actionDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.activity.actionDate.required'
            },
            {
                property: 'endDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.activity.endDate.required'
            },
            {
                property: 'endDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'actionDate',
                errMsg: 'error.endDate.gte.to.actionDate'
            }
        ]
    },
    contactTask: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.task.name.required'
            },
            {
                property: 'startDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.task.startDate.required'
            },
            {
                property: 'dueDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.task.dueDate.required'
            },
            {
                property: 'dueDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.dueDate.gte.to.startDate'
            },
            {
                property: 'empId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.task.empId.required'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.task.name.required'
            },
            {
                property: 'startDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.task.startDate.required'
            },
            {
                property: 'dueDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.task.dueDate.required'
            },
            {
                property: 'dueDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.dueDate.gte.to.startDate'
            },
            {
                property: 'empId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.task.empId.required'
            }
        ]
    },
    partner: {
        doInsert: [
            {
                property: 'fullName',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.fullName.required'
            },
            {
                property: 'phone',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.phone.required'
            },
            {
                property: 'email',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.email.required'
            },
            {
                property: 'email',
                command: 'email',
                commandValue: undefined,
                errMsg: 'error.partner.email.invalid'
            },
            {
                property: 'phone',
                command: 'numeric',
                commandValue: undefined,
                errMsg: 'error.partner.phone.invalid'
            }
        ],
        doUpdate: [
            {
                property: 'fullName',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.fullName.required'
            },
            {
                property: 'phone',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.phone.required'
            },
            {
                property: 'email',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.email.required'
            },
            {
                property: 'email',
                command: 'email',
                commandValue: undefined,
                errMsg: 'error.partner.email.invalid'
            },
            {
                property: 'phone',
                command: 'numeric',
                commandValue: undefined,
                errMsg: 'error.partner.phone.invalid'
            }
        ],
        doPartnerInsert: [
            {
                property: 'fullName',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.fullName.required.title'
            },
            {
                property: 'phone',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.phone.required.title'
            },
            {
                property: 'email',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.email.required.title'
            },
            {
                property: 'email',
                command: 'email',
                commandValue: undefined,
                errMsg: 'error.partner.email.invalid.title'
            },
            {
                property: 'phone',
                command: 'numeric',
                commandValue: undefined,
                errMsg: 'error.partner.phone.invalid.title'
            },
            {
                property: 'position',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.position.required'
            },
            {
                property: 'company',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.company.required.title'
            },
            {
                property: 'username',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.username.required'
            }

        ],
        doLock: [
            {
                property: 'lockReason',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.reason.required'
            }
        ],
        doUnlock: [
            {
                property: 'unlockReason',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.reason.required'
            }
        ],
        doGenCode: [
            {
                property: 'numbersOfCode',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.code.number.required'
            },
            {
                property: 'expireDaysOfCode',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.partner.code.expiredDay.required'
            }
        ]
    },
    coupon: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.coupon.name.required'
            },
            {
                property: 'code',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.coupon.code.required'
            },
            {
                property: 'partnerId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.coupon.partnerId.required'
            },
            {
                property: 'code',
                command: 'couponCode',
                commandValue: undefined,
                errMsg: 'error.coupon.code.invalid'
            },
            {
                property: 'startDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.coupon.startDate.required'
            },
            {
                property: 'dueDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.coupon.dueDate.required'
            },
            {
                property: 'dueDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.dueDate.gte.to.startDate'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.coupon.name.required'
            },
            {
                property: 'code',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.coupon.code.required'
            },
            {
                property: 'partnerId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.coupon.partnerId.required'
            },
            {
                property: 'code',
                command: 'couponCode',
                commandValue: undefined,
                errMsg: 'error.coupon.code.invalid'
            },
            {
                property: 'startDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.coupon.startDate.required'
            },
            {
                property: 'dueDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.coupon.dueDate.required'
            },
            {
                property: 'dueDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.dueDate.gte.to.startDate'
            }
        ]
    },
    newsletter: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.newsletter.name.required'
            },
            {
                property: 'groupId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.newsletter.groupid.required'
            },
            {
                property: 'subject',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.newsletter.title.required'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.newsletter.name.required'
            },
            {
                property: 'groupId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.newsletter.groupid.required'
            },
            {
                property: 'subject',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.newsletter.title.required'
            }
        ],
        doSendEmail: [
            {
                property: 'emailTo',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.newsletter.emailReplyTo.required'
            }
        ]
    },
    workingLabelCategory: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.working.label.category.name.required'
            },
            {
                property: 'description',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.working.label.category.description.required'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.working.label.category.name.required'
            },
            {
                property: 'description',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.working.label.category.description.required'
            }
        ]
    },
    tag: {
        doInsert: [
            {
                property: 'tagName',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.tag.name.required'
            },
            {
                property: 'tagCode',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.tag.code.required'
            },
            {
                property: 'tagCode',
                command: 'alphanumericExtend',
                commandValue: undefined,
                errMsg: 'error.tag.code.invalid'
            },
            {
                property: 'tagCode',
                command: 'maxlengthValue',
                commandValue: 32,
                errMsg: 'error.tag.code.invalid'
            }
        ],
        doUpdate: [
            {
                property: 'tagName',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.tag.name.required'
            },
            {
                property: 'tagCode',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.tag.code.required'
            },
            {
                property: 'tagCode',
                command: 'alphanumericExtend',
                commandValue: undefined,
                errMsg: 'error.tag.code.invalid'
            },
            {
                property: 'tagCode',
                command: 'maxlengthValue',
                commandValue: 32,
                errMsg: 'error.tag.code.invalid'
            }
        ]
    },
    chatManagement: {
        doInsert: [
            {
                property: 'appId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.chat.management.app.id.required'
            }
        ],
        doUpdate: [
            {
                property: 'appId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.chat.management.app.id.required'
            }
        ]
    },

    trackingEventCode: {
        doInsertGroup: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.tracking.event.name.required'
            }
        ],
        doInsert: [
            {
                property: 'code',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.tracking.event.code.required'
            },
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.tracking.event.name.required'
            },
            {
                property: 'parentId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.tracking.event.parentId.required'
            }
        ],
        doUpdate: [
            {
                property: 'code',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.tracking.event.code.required'
            },
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.tracking.event.name.required'
            },
            {
                property: 'parentId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.tracking.event.parentId.required'
            }
        ]
    },

    contactObjectCategory: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.object.category.name.required'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.object.category.name.required'
            }
        ]
    },

    emailConfig: {
        doInsert: [
            {
                property: 'code',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.config.code.required'
            },
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.config.name.required'
            }
        ],
        doUpdate: [
            {
                property: 'code',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.config.code.required'
            },
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.config.name.required'
            }
        ]
    },
    filterView: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.filter.view.name.required'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.filter.view.name.required'
            }
        ]
    },
    contactInfoChecklist: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.info.checklist.name.required'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.contact.info.checklist.name.required'
            }
        ]
    },
    dashboardGroup: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.group.name.required'
            }
        ]
    },
    workingRelation: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.working.relation.name.required'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.working.relation.name.required'
            }
        ]
    },
    dashboardFilter: {
        workingOfEmpFilterDrawChart: [
            {
                property: 'filter.empId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.empId.required'
            },
            {
                property: 'filter.workingTypes',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.workingTypes.required'
            }
        ],
        workingOfEmpFilter: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.name.required'
            },
            {
                property: 'filter.empId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.empId.required'
            },
            {
                property: 'filter.workingTypes',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.workingTypes.required'
            }
        ],
        workingOfEmpsFilterDrawChart: [
            {
                property: 'filter.empIds',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.empId.required'
            },
            {
                property: 'filter.workingTypes',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.workingTypes.required'
            }
        ],
        workingOfEmpsFilter: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.name.required'
            },
            {
                property: 'filter.empIds',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.empId.required'
            },
            {
                property: 'filter.workingTypes',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.workingTypes.required'
            }
        ],
        goalOfEmpFilterDrawChart: [
            {
                property: 'filter.empId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.empId.required'
            },
            {
                property: 'filter.goalTypes',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalTypes.required'
            },
            {
                property: 'filter.goalPlanId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalPlanId.required'
            }
        ],
        goalOfEmpFilter: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.name.required'
            },
            {
                property: 'filter.empId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.empId.required'
            },
            {
                property: 'filter.goalTypes',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalTypes.required'
            },
            {
                property: 'filter.goalPlanId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalPlanId.required'
            }
        ],
        goalOfDeptFilterDrawChart: [
            {
                property: 'filter.comId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.comId.required'
            },
            {
                property: 'filter.goalPlanId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalPlanId.required'
            }
        ],
        goalOfDeptFilter: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.name.required'
            },
            {
                property: 'filter.comId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.comId.required'
            },
            {
                property: 'filter.goalPlanId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalPlanId.required'
            }
        ],
        // workingProjectFilterDrawChart: [
        //     {
        //         property: 'filter.goalId',
        //         command: 'required',
        //         commandValue: undefined,
        //         errMsg: 'error.dashboard.filter.goalId.required'
        //     }
        // ],
        workingProjectFilter: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.name.required'
            },
            {
                property: 'filter.goalId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalId.required'
            }
        ],
        goalDeptFilterDrawChart: [
            {
                property: 'filter.comId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.comId.required'
            },
            {
                property: 'filter.goalPlanId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalPlanId.required'
            }
        ],
        goalDeptFilter: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.name.required'
            },
            {
                property: 'filter.comId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.comId.required'
            },
            {
                property: 'filter.goalPlanId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalPlanId.required'
            }
        ],
        goalEmpFilterDrawChart: [
            {
                property: 'filter.empId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.empId.required'
            },
            {
                property: 'filter.goalTypes',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalTypes.required'
            },
            {
                property: 'filter.goalPlanId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalPlanId.required'
            }
        ],
        goalEmpFilter: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.name.required'
            },
            {
                property: 'filter.empId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.empId.required'
            },
            {
                property: 'filter.goalTypes',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalTypes.required'
            },
            {
                property: 'filter.goalPlanId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalPlanId.required'
            }
        ],
        keyresultOfGoalFilterDrawChart: [
            {
                property: 'filter.goalId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalId.required'
            }
        ],
        keyresultOfGoalFilter: [
            {
                property: 'filter.goalId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalId.required'
            }
        ],
        empGoalCategoryFilterDrawChart: [
            {
                property: 'filter.empId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.empId.required'
            },
            {
                property: 'filter.goalPlanId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalPlanId.required'
            },
            {
                property: 'filter.categoryId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.categoryId.required'
            },
            {
                property: 'filter.goalTypes',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalTypes.required'
            }
        ],
        empGoalCategoryFilter: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.name.required'
            },
            {
                property: 'filter.empId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.empId.required'
            },
            {
                property: 'filter.goalPlanId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalPlanId.required'
            },
            {
                property: 'filter.categoryId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.categoryId.required'
            },
            {
                property: 'filter.goalTypes',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalTypes.required'
            }
        ],
        deptGoalCategoryFilterDrawChart: [
            {
                property: 'filter.comId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.comId.required'
            },
            {
                property: 'filter.goalPlanId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalPlanId.required'
            },
            {
                property: 'filter.categoryId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.categoryId.required'
            }
        ],
        deptGoalCategoryFilter: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.name.required'
            },
            {
                property: 'filter.comId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.comId.required'
            },
            {
                property: 'filter.goalPlanId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.goalPlanId.required'
            },
            {
                property: 'filter.categoryId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.categoryId.required'
            }
        ],
        reportFormInfoStatisticFilterDrawChart: [
            {
                property: 'filter.name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.name.required'
            }
        ],
        reportFormInfoStatisticFilter: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.name.required'
            }
        ],
        reportFormInfoListFilterDrawChart: [
            {
                property: 'filter.name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.filter.name.required'
            }
        ],
        reportFormInfoListFilter: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.dashboard.name.required'
            }
        ],
        formInfoListFieldStatisticFilter: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.dashboard.name.required'
            },
            {
                property: 'filter.formId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.dashboard.filter.formId.required'
            },
            {
                property: 'filter.columnField',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.dashboard.filter.column.field.required'
            },
            {
                property: 'filter.valueField',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.dashboard.filter.value.field.required'
            },
            {
                property: 'filter.statuses',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.dashboard.filter.statuses.required'
            }
        ],
        formInfoListFieldStatisticFilterDrawChart: [
            {
                property: 'filter.formId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.dashboard.filter.formId.required'
            },
            {
                property: 'filter.columnField',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.dashboard.filter.column.field.required'
            },
            {
                property: 'filter.valueField',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.dashboard.filter.value.field.required'
            },
            {
                property: 'filter.statuses',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.dashboard.filter.statuses.required'
            }
        ]
    },
    organization: {
        update: [
            {
                property: 'userLimit',
                command: 'numeric',
                commandValue: undefined,
                errMsg: 'error.organization.update.userlimit.numeric'
            },
            {
                property: 'userLimit',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.organization.update.userlimit.numeric'
            },
            {
                property: 'start',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.organization.update.userlimit.start'
            },
            {
                property: 'end',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.organization.update.userlimit.end'
            }
        ]
    },
    userLog: {
        doSearch: [
            {
                property: 'fromDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.coupon.fromDate.required'
            },
            {
                property: 'toDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.coupon.toDate.required'
            },
            {
                property: 'toDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.dueDate.gte.to.fromDate'
            }
        ]
    },
    updateResult: {
        doUpdateCompletePercentResult: [
            {
                property: 'completePercent',
                command: 'percentExtend',
                commandValue: undefined,
                errMsg: 'error.goal.update.complete.percent.invalid'
            }
        ]
    },
    goalReviewInsert: {
        doGoalReviewInsert: [
            {
                property: 'empName',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.review.emp.name.required'
            },
            {
                property: 'statuses',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.review.statuses.required'
            },
            {
                property: 'date',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.review.date.required'
            }
        ]
    },
    goalReviewComment: {
        doUpdateComment: {}
    },
    goalKeyResultCopy: {
        doCopyEmp: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.key.result.copy.name.required'
            },
            {
                property: 'empId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.key.result.copy.empId.required'
            },
            {
                property: 'startDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.startDate.required'
            },
            {
                property: 'dueDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.dueDate.required'
            },
            {
                property: 'dueDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.endDate.gte.to.startDate'
            }
        ],
        doCopyCom: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.key.result.copy.name.required'
            },
            {
                property: 'comId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.key.result.copy.companyId.required'
            },
            {
                property: 'startDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.startDate.required'
            },
            {
                property: 'dueDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.dueDate.required'
            },
            {
                property: 'dueDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.endDate.gte.to.startDate'
            }
        ],
        doCopyKR: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.key.result.copy.name.kr.required'
            },
            {
                property: 'goalTargetId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.key.result.copy.goalTargetId.required'
            }
        ]
    },
    goalKeyResultConvert: {
        doConvertEmp: [
            {
                property: 'empId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.employeeId.required'
            },
            {
                property: 'planId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.planId.required'
            },
            {
                property: 'sharingId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.sharingId.required'
            },
            {
                property: 'categoryId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.categoryId.required'
            },
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.name.required'
            },
            {
                property: 'startDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.startDate.required'
            },
            {
                property: 'dueDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.dueDate.required'
            },
            {
                property: 'dueDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.endDate.gte.to.startDate'
            }

        ],
        doConvertCom: [
            {
                property: 'comId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.companyId.required'
            },
            {
                property: 'planId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.planId.required'
            },
            {
                property: 'sharingId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.sharingId.required'
            },
            {
                property: 'categoryId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.categoryId.required'
            },
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.name.required'
            },
            {
                property: 'startDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.startDate.required'
            },
            {
                property: 'dueDate',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.dueDate.required'
            },
            {
                property: 'dueDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.endDate.gte.to.startDate'
            }
        ]
    },
    goalToKR: {
        doMove: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.to.key.result.name.required'
            },
            {
                property: 'cascadeTo',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.goal.convert.to.kr.cascadeTo.required'
            },
            {
                property: 'dueDate',
                command: 'dateGreaterEqualValue',
                commandValue: 'startDate',
                errMsg: 'error.endDate.gte.to.startDate'
            }
        ]
    },
    attachment: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.attachment.name.required'
            },
            {
                property: 'path',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.attachment.path.required'
            }
        ]
    },
    workingTemplate: {
        doInsertGroup: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.working.template.group.name.required'
            }
        ],
        doUpdateGroup: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.working.template.group.name.required'
            }
        ],
        doInsertWorkingTemplate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.working.template.name.required'
            }
        ],
        doUpdateWorkingTemplate: [
            {
                property: 'parentId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.working.template.parentId.required'
            },
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.working.template.name.required'
            }
        ]
    },
    rapCategory: {
        doInsertRapCategory: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.category.name.required'
            }
        ],
        doUpdateRapCategory: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.category.name.required'
            },
            {
                property: 'parentId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.category.parentId.required'
            }
        ]
    },
    rapRoutemap: {
        doInsert: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.routemap.name.required'
            },
            {
                property: 'formId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.routemap.form.required'
            }
        ],
        doUpdate: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.routemap.name.required'
            },
            {
                property: 'formId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.routemap.form.required'
            }
        ]
    },
    rapRoutemapStep: {
        doInsertStep: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.routemap.step.name.required'
            }
        ],
        doUpdateStep: [
            {
                property: 'name',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.routemap.step.name.required'
            },
            {
                property: 'processorRoleName',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.routemap.step.processor.role.required'
            }
        ]
    },
    rapStepAction: {
        rapStepActionInsert: [
            {
                property: 'type',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.step.action.type.name.required'
            },
            {
                property: 'actionId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.action.action.name.required'
            }
        ],
        rapStepActionUpdate: [
            {
                property: 'type',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.step.action.type.name.required'
            },
            {
                property: 'actionId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.action.action.required'
            }
        ]
    },
    rapStepField: {
        doInsertStepField: [
            {
                property: 'formFieldId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.step.field.name.required'
            }
        ],
        doUpdateStepField: [
            {
                property: 'formFieldId',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.rap.step.field.name.required'
            }
        ]
    }
    ,
    simpleEmployee: {
        doInsert: [
            {
                property: 'code',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.config.name.required'
            },
            {
                property: 'firstName',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.config.name.required'
            },
            {
                property: 'lastName',
                command: 'required',
                commandValue: undefined,
                errMsg: 'error.email.config.name.required'
            }
        ]
    }
}