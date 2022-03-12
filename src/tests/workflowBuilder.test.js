import { InputNode, WorkflowBuilder } from '../utils/workflowBuilder';
import { blacklist, ConductorApi, interestRate, lock, log, tag, unlock, update } from '../api/restful';

/* eslint-disable */
test('workflow builder test', () => {
    const builder = new WorkflowBuilder('TestWorkflow', 2, 'rinne@rinne.top');
    builder.setDescription('Demo workflow for testing workflowBuilder library.');
    builder.setRuntimeInput(['cid', 'oid', 'pid']);
    builder.setBuildtimeInput({
        bid: 'bid_dhfsgdfhshid',
        gid: 'gid_sdfhisdhhflh'
    });
    builder.setOutput({
        interest: '${interest_1.output.response.body.interest}'
    });

    const inputNode = new InputNode();

    const blacklistNode1 = inputNode.setNextHttpNode(blacklist, 'POST');
    blacklistNode1
        .setName('Blacklist 1')
        .setTaskReferenceName('blacklist_1')
        .setBody({
            cid: '${workflow.input.cid}',
            bid: '${workflow.input.bid}'
        });

    const tagNode1 = blacklistNode1.setNextHttpNode(tag, 'POST');
    tagNode1
        .setName('Tag 1')
        .setTaskReferenceName('tag_1')
        .setBody({
            cid: '${workflow.input.cid}',
            gid: '${workflow.input.gid}'
        });

    const switchTagNode1Node = tagNode1.setNextSwitchNode('${tag_1.output.response.body.statusCode}');
    switchTagNode1Node
        .setName('switchTagNode1Node')
        .setTaskReferenceName('switch_tag_1');

    const terminateNode1 = switchTagNode1Node.addTerminateCase('default', "FAILED", 0);
    terminateNode1
        .setName('terminate 1')
        .setTaskReferenceName('terminate_1');

    const logNode2 = switchTagNode1Node.addHttpCase(200, lock, 'POST');
    logNode2
        .setName('log 2')
        .setTaskReferenceName('log_2')
        .setBody({
            oid: '${workflow.input.oid}',
            description: '200'
        });

    const lockNode1 = logNode2.setNextHttpNode(lock, 'POST');
    lockNode1
        .setName('lock 1')
        .setTaskReferenceName('lock_1')
        .setBody({
            oid: '${workflow.input.oid}',
            pid: '${workflow.input.pid}'
        });

    switchTagNode1Node.setNextNode(lockNode1);

    const logNode1 = switchTagNode1Node.addHttpCase(204, log, 'POST');
    logNode1
        .setName('log 1')
        .setTaskReferenceName('log_1')
        .setBody({
            oid: '${workflow.input.oid}',
            description: 'There is no content to send for this request, but the headers may be useful. ' +
                'The user agent may update its cached headers for this resource with the new ones.'
        });

    const updateNode1 = lockNode1.setNextHttpNode(update, 'POST');
    updateNode1
        .setName('update 1')
        .setTaskReferenceName('update_1')
        .setBody({
            pid: '${workflow.input.pid}'
        });

    const unlockNode1 = updateNode1.setNextHttpNode(unlock, 'POST');
    unlockNode1
        .setName('unlock 1')
        .setTaskReferenceName('unlock_1')
        .setBody({
            pid: '${workflow.input.pid}'
        });

    const interestNode1 = unlockNode1.setNextHttpNode(interestRate, 'POST');
    interestNode1
        .setName('interest 1')
        .setTaskReferenceName('interest_1')
        .setBody({
            oid: '${workflow.input.oid}'
        });

    const logNode3 = interestNode1.setNextHttpNode(log, 'POST');
    logNode3
        .setName('log 3')
        .setTaskReferenceName('log_3')
        .setBody({
            oid: '${workflow.input.oid}',
            description: 'Succeed'
        });

    builder.setInputNode(inputNode);
    const workflow = builder.build();
    console.log(workflow);

    const conductor = new ConductorApi();
    conductor.setWorkFlow(workflow);
});
/* eslint-enable */