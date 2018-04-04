import React from 'react';
import {connect} from "react-redux";
import api from "../api";
import _ from "underscore";
import {FormGroup, Label, Input} from 'reactstrap';

function TaskForm(props) {

    let taskForm = props.new_task_form;

    function create_task() {

        let data = {isAssignClicked: true};
        let action = {
            type: "UPDATE_FROM",
            task: data,
        };
        console.log("action", action);
        props.dispatch(action);

        if (taskForm.user_id && taskForm.title && taskForm.description && taskForm.assigned_to) {
            let data = {
                user_id: taskForm.user_id,
                title: taskForm.title,
                description: taskForm.description,
                assigned_to: taskForm.assigned_to,
                time: 0,
                complete: false,
            };

            api.create_task(data);

        }


    }

    function input_update(ev) {

        let target = $(ev.target);
        let data = {};

        data[target.attr("name")] = target.val();
        console.log(data);
        let action = {
            type: "UPDATE_FROM",
            task: data,
        };

        props.dispatch(action);

    }

    let users = _.map(props.users, (user) => <option key={user.id} value={user.username}>{user.username}</option>);
    return <div style={{padding: "4ex"}}>
        <h2>New Task</h2>
        <div className="row">
            <div className={"col-3"}>
                <div className={"form-group" + (taskForm.isAssignClicked && !taskForm.title ? " has-error" : "")}>
                    <Label for="title">Title: </Label>
                    <Input type="input" name="title" value={taskForm.title}
                           onChange={input_update}/>
                    {taskForm.isAssignClicked && !taskForm.title &&
                    <div className="help-block">Title is required</div>
                    }
                </div>
            </div>
            <div className={"col-3"}>
                <div className={"form-group" + (taskForm.isAssignClicked && !taskForm.assigned_to ? " has-error" : "")}>
                    <Label for="assigned_to">Assigned to: </Label>
                    <select className={"form-control"} type="select" name="assigned_to" value={taskForm.assigned_to}
                            onChange={input_update}>
                        <option value="" selected disabled hidden>Choose Here</option>
                        {users}
                    </select>
                    {taskForm.isAssignClicked && !taskForm.assigned_to &&
                    <div className="help-block">Assignee is required</div>
                    }
                </div>
            </div>
        </div>
        <div className="row">
            <div className={"col-6"}>
                <div className={"form-group" + (taskForm.isAssignClicked && !taskForm.description ? " has-error" : "")}>
                    <Label for="description">Description: </Label>
                    <Input type="textarea" name="description" value={taskForm.description}
                           onChange={input_update}/>
                    {taskForm.isAssignClicked && !taskForm.description &&
                    <div className="help-block">Description is required</div>
                    }
                </div>
            </div>
        </div>
        <button className={"btn btn-primary"} onClick={create_task}>Assign</button>
    </div>
        ;
}

function state2props(state) {
    console.log("task form state2props", state);
    return {new_task_form: state.new_task_form};
}

export default connect(state2props)(TaskForm);