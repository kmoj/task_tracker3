import React from 'react';
import _ from "underscore";
import Task from './task';

export default function Tasks(props) {

    let finished = _.filter(props.tasks, (task) => task.complete == true);
    let workingOn = _.filter(props.tasks, (task) => task.complete == false);
    finished.sort(sortTask);
    workingOn.sort(sortTask);
    finished = _.map(finished, (tt) => <Task key={tt.id} task={tt} col={props.col} />)
    workingOn = _.map(workingOn, (tt) => <Task key={tt.id} task={tt} col={props.col} />);


    function sortTask(a, b) {
        if ((a.updated_at - b.updated_at) > 0) {
            return 1;
        } else {
            return -1;
        }
    }

    return <div>
        <p>Finished: {finished.length}  Working On: {workingOn.length}</p>
        {workingOn}
        {finished}
    </div>;
}