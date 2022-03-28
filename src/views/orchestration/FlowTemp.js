// eslint-disable-next-line import/prefer-default-export
export const temp = {
    createTime: 1648455336189,
    name: '模板嵌套_嵌套库存操作',
    description: '本流程中嵌套了库存的相关操作，复用了库存模板',
    version: 1,
    tasks: [
        {
            name: 'Profile_1ko5skxc3hwg0_Node',
            taskReferenceName: 'Profile_1ko5skxc3hwg0_Node',
            inputParameters: {
                http_request: {
                    uri: 'http://conductor.rinne.top:10452/v1/examine/profile',
                    method: 'POST',
                    body: {
                        // eslint-disable-next-line no-template-curly-in-string
                        cid: '${workflow.input.cid}',
                        // eslint-disable-next-line no-template-curly-in-string
                        phoneNum: '${workflow.input.phoneNum}',
                        // eslint-disable-next-line no-template-curly-in-string
                        password: '${workflow.input.password}'
                    }
                }
            },
            type: 'HTTP',
            decisionCases: {},
            defaultCase: [],
            forkTasks: [],
            startDelay: 0,
            joinOn: [],
            optional: true,
            defaultExclusiveJoinTask: [],
            asyncComplete: false,
            loopOver: []
        },
        {
            name: 'switchTagNodes476in1xno00Node',
            taskReferenceName: 'switch_tag_s476in1xno00',
            inputParameters: {
                // eslint-disable-next-line no-template-curly-in-string
                switchCaseValue: '${Profile_1ko5skxc3hwg0_Node.output.response.statusCode}'
            },
            type: 'SWITCH',
            decisionCases: {
                200: [
                    {
                        name: '库存操作',
                        taskReferenceName: '库存操作',
                        inputParameters: {
                            // eslint-disable-next-line no-template-curly-in-string
                            cid: '${workflow.input.cid}',
                            // eslint-disable-next-line no-template-curly-in-string
                            pid: '${workflow.input.pid}',
                            // eslint-disable-next-line no-template-curly-in-string
                            oid: '${workflow.input.oid}',
                            // eslint-disable-next-line no-template-curly-in-string
                            phoneNum: '${workflow.input.phoneNum}',
                            // eslint-disable-next-line no-template-curly-in-string
                            password: '${workflow.input.password}',
                            // eslint-disable-next-line no-template-curly-in-string
                            wid: '${workflow.input.wid}',
                            // eslint-disable-next-line no-template-curly-in-string
                            bid: '${workflow.input.bid}',
                            // eslint-disable-next-line no-template-curly-in-string
                            gid: '${workflow.input.gid}',
                            // eslint-disable-next-line no-template-curly-in-string
                            region: '${workflow.input.region}'
                        },
                        type: 'SUB_WORKFLOW',
                        subWorkflowParam: {
                            name: '库存操作',
                            version: 1
                        }
                    }
                ]
            },
            defaultCase: [
                {
                    name: 'Log_211d7dt7d6bk0_Node',
                    taskReferenceName: 'Log_211d7dt7d6bk0_Node',
                    inputParameters: {
                        http_request: {
                            uri: 'http://conductor.rinne.top:10452/v1/system/log',
                            method: 'POST',
                            body: {
                                // eslint-disable-next-line no-template-curly-in-string
                                oid: '${workflow.input.oid}',
                                description: '测试test'
                            }
                        }
                    },
                    type: 'HTTP',
                    decisionCases: {},
                    defaultCase: [],
                    forkTasks: [],
                    startDelay: 0,
                    joinOn: [],
                    optional: false,
                    defaultExclusiveJoinTask: [],
                    asyncComplete: false,
                    loopOver: []
                },
                {
                    name: 'terminate_1vbpw61mnhs00_Node',
                    taskReferenceName: 'terminate_1vbpw61mnhs00_Node',
                    inputParameters: {
                        terminationStatus: 'FAILED',
                        workflowOutput: 0
                    },
                    type: 'TERMINATE',
                    decisionCases: {},
                    defaultCase: [],
                    forkTasks: [],
                    startDelay: 0,
                    joinOn: [],
                    optional: false,
                    defaultExclusiveJoinTask: [],
                    asyncComplete: false,
                    loopOver: []
                }
            ],
            forkTasks: [],
            startDelay: 0,
            joinOn: [],
            optional: false,
            defaultExclusiveJoinTask: [],
            asyncComplete: false,
            loopOver: [],
            evaluatorType: 'value-param',
            expression: 'switchCaseValue'
        }
    ],
    inputParameters: ['pid', 'cid', 'oid', 'phoneNum', 'password'],
    outputParameters: {},
    schemaVersion: 2,
    restartable: true,
    workflowStatusListenerEnabled: false,
    ownerEmail: '1010353663@qq.com',
    timeoutPolicy: 'ALERT_ONLY',
    timeoutSeconds: 0,
    variables: {},
    inputTemplate: {
        wid: '',
        bid: '',
        region: [],
        gid: ''
    }
};
