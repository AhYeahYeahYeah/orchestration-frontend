// eslint-disable-next-line max-classes-per-file
export class InputNode {
    constructor() {
        this.type = 'Input';
    }

    setNextHttpNode = (url, method) => {
        // eslint-disable-next-line no-use-before-define
        this.nextNode = new HttpNode(url, method);
        return this.nextNode;
    };

    setNextSwitchNode = (expression) => {
        // eslint-disable-next-line no-use-before-define
        this.nextNode = new SwitchNode(expression);
        return this.nextNode;
    };
}

export class TerminateNode {
    constructor(status, output) {
        this.type = 'Terminate';
        this.taskReferenceName = `${status}_Terminate_${output}`;
        this.name = this.taskReferenceName;
        this.status = status;
        this.output = output;
    }

    setName = (name) => {
        this.name = name;
        return this;
    };

    setTaskReferenceName = (taskReferenceName) => {
        this.taskReferenceName = taskReferenceName;
        return this;
    };
}

export class SwitchNode {
    constructor(expression) {
        this.type = 'Switch';
        this.taskReferenceName = `${expression}_Switch`;
        this.name = this.taskReferenceName;
        this.expression = expression;
        this.nextNode = [];
    }

    addHttpCase = (expressionCase, url, method) => {
        // eslint-disable-next-line no-use-before-define
        const httpNode = new HttpNode(url, method);
        this.nextNode.push({
            expressionCase,
            node: httpNode
        });

        return httpNode;
    };

    addSwitchCase = (expressionCase, newExpression) => {
        const switchNode = new SwitchNode(newExpression);
        this.nextNode.push({
            expressionCase,
            node: switchNode
        });

        return switchNode;
    };

    addTerminateCase = (expressionCase, status, output) => {
        const terminateNode = new TerminateNode(status, output);
        this.nextNode.push({
            expressionCase,
            node: terminateNode
        });

        return terminateNode;
    };

    setName = (name) => {
        this.name = name;
        return this;
    };

    setTaskReferenceName = (taskReferenceName) => {
        this.taskReferenceName = taskReferenceName;
        return this;
    };

    setNextNode = (nextNode) => {
        const taskIter = (node) => {
            if (node.nextNode === undefined && node.type !== 'Terminate') {
                nextNode.break = this.taskReferenceName;
                node.setNextBreakNode(nextNode);
                return;
            }

            switch (node.type) {
                case 'Http':
                    taskIter(node.nextNode);
                    break;

                case 'Switch':
                    node.nextNode.forEach((subNode) => {
                        taskIter(subNode.node);
                    });
                    break;

                case 'Terminate':
                    break;

                default:
                    console.log('Error');
                    break;
            }
        };

        taskIter(this);
        return nextNode;
    };
}

export class HttpNode {
    constructor(url, method) {
        this.type = 'Http';
        this.taskReferenceName = `${url}_${method}`;
        this.name = this.taskReferenceName;
        this.url = url;
        this.method = method;
        this.optional = false;
    }

    setBody = (data) => {
        this.body = data;
        return this;
    };

    setName = (name) => {
        this.name = name;
        return this;
    };

    setTaskReferenceName = (taskReferenceName) => {
        this.taskReferenceName = taskReferenceName;
        return this;
    };

    setNextHttpNode = (url, method) => {
        this.nextNode = new HttpNode(url, method);
        return this.nextNode;
    };

    setNextSwitchNode = (expression) => {
        this.nextNode = new SwitchNode(expression);
        return this.nextNode;
    };

    setNextBreakNode = (node) => {
        this.nextNode = node;
    };
}

export class WorkflowBuilder {
    constructor(name, version, ownerEmail) {
        this.name = name;
        this.version = version;
        this.ownerEmail = ownerEmail;
    }

    setBuildtimeInput = (buildtimeInput) => {
        this.buildtimeInput = buildtimeInput;
        return this;
    };

    // List of string
    setRuntimeInput = (runtimeInput) => {
        this.runtimeInput = runtimeInput;
        return this;
    };

    setOutput = (output) => {
        this.output = output;
        return this;
    };

    setInputNode = (inputNode) => {
        this.inputNode = inputNode;
        return this;
    };

    setDescription = (description) => {
        this.description = description;
        return this;
    };

    build = () => {
        if (this.name === undefined || this.version === undefined || this.inputNode.nextNode === undefined) {
            return '';
        }

        const ret = {};
        ret.name = this.name;
        ret.version = this.version;
        ret.ownerEmail = this.ownerEmail;
        ret.description = this.description;
        ret.schemaVersion = 2;
        ret.inputParameters = this.runtimeInput;
        ret.inputTemplate = this.buildtimeInput;
        ret.outputParameters = this.output;
        ret.tasks = [];

        const taskIter = (node, list) => {
            if (node === undefined) return undefined;
            if (node.break !== undefined) {
                return node;
            }

            const task = {};

            let breakNode;
            switch (node.type) {
                case 'Input':
                    taskIter(node.nextNode, list);
                    break;

                case 'Http':
                    task.type = 'HTTP';
                    task.name = node.name;
                    task.taskReferenceName = node.taskReferenceName;
                    task.inputParameters = {
                        http_request: {
                            uri: node.url,
                            method: node.method,
                            body: node.body
                        }
                    };
                    if (node.nextNode && node.nextNode.type === 'Switch') task.optional = true;
                    list.push(task);
                    // eslint-disable-next-line no-case-declarations
                    const b = taskIter(node.nextNode, list);
                    if (b !== undefined) breakNode = b;
                    break;

                case 'Switch':
                    task.type = 'SWITCH';
                    task.name = node.name;
                    task.taskReferenceName = node.taskReferenceName;
                    task.evaluatorType = 'value-param';
                    task.expression = 'switchCaseValue';
                    task.inputParameters = {
                        switchCaseValue: node.expression
                    };
                    task.decisionCases = {};
                    task.defaultCase = [];
                    list.push(task);

                    node.nextNode.forEach((subNode) => {
                        if (subNode.expressionCase === 'default') {
                            const n = taskIter(subNode.node, task.defaultCase);
                            if (n !== undefined) breakNode = n;
                        } else {
                            task.decisionCases[subNode.expressionCase] = [];
                            const n = taskIter(subNode.node, task.decisionCases[subNode.expressionCase]);
                            if (n !== undefined) breakNode = n;
                        }
                    });
                    if (breakNode !== undefined && breakNode.break === node.taskReferenceName) {
                        breakNode.break = undefined;
                        taskIter(breakNode, list);
                    }
                    break;

                case 'Terminate':
                    task.type = 'TERMINATE';
                    task.name = node.name;
                    task.taskReferenceName = node.taskReferenceName;
                    task.inputParameters = {
                        terminationStatus: node.status,
                        workflowOutput: node.output
                    };
                    list.push(task);
                    break;

                default:
                    console.log('Error');
                    break;
            }

            return breakNode;
        };

        taskIter(this.inputNode, ret.tasks);
        return JSON.stringify(ret);
    };
}
