import React from 'react';
import api from "../api";
import {Button, FormGroup, Label, Input} from 'reactstrap';
import _ from "underscore";
import {connect} from "react-redux";

function TaskDetails(props) {

    let taskId = props.taskId;
    let taskCopy = _.filter(props.tasks, (task) => task.id == taskId)[0];
    let task = props.tasks_details_form;

    let assignerId = taskCopy.user.id;
    let currentUserId = props.token.user_id;
    let currentUsername = props.token.username;
    let isTopFeildDisable = true;
    let isBottomFeildDisable = true;

    if(assignerId == currentUserId) {
        isTopFeildDisable = false;
    } else {
        isBottomFeildDisable = false;
    }

    if(taskCopy.user.username == task.assigned_to && task.assigned_to == currentUsername) {
        isTopFeildDisable = false;
        isBottomFeildDisable = false;
    }

    if (task.id == null) {
        api.request_task_by_id(taskId);
    }

    let users = _.map(props.users, (user) => <option key={user.id} value={user.username}>{user.username}</option>);

    function update_task() {

        let data = {isAssignClicked: true};
        let action = {
            type: "UPDATE_DETAILS_FORM",
            task: data,
        };

        props.dispatch(action);


        if (task.user_id && task.title && task.description && task.assigned_to && (task.session_time%15 == 0) ) {

            let time = new Number(task.time);
            let sTime = new Number(task.session_time);
            let newTime = time+sTime;

            let data = {
                id: taskId,
                user_id: task.user_id,
                title: task.title,
                description: task.description,
                assigned_to: task.assigned_to,
                time: newTime,
                complete: task.complete,
            };

            api.update_task(data);


            switch_input_btn_disable();

            let newForm = {
                time: newTime,
                session_time: 0,
                isAssignClicked: false
            };

            let actionClearForm = {
                type: "UPDATE_DETAILS_FORM",
                task: newForm,
            };

            props.dispatch(actionClearForm);

        }

    }

    function input_update(ev) {

        let target = $(ev.target);
        let data = {};

        if (target.attr("id") == "complete") {
            data[target.attr("id")] = target.is(":checked");
        } else {
            data[target.attr("id")] = target.val();
        }

        let action = {
            type: "UPDATE_DETAILS_FORM",
            task: data,
        };

        props.dispatch(action);

    }

    function cancel_btn_clicked() {

        api.request_task_by_id(taskId);
        let clearTimeForm = {
            session_time: 0
        };

        let actionClearTimeForm = {
            type: "UPDATE_DETAILS_FORM",
            task: clearTimeForm,
        };

        props.dispatch(actionClearTimeForm);
        switch_input_btn_disable();



    }

    function edit_btn_clicked() {

        switch_input_btn_disable();

    }

    function switch_input_btn_disable() {

        let edit_btn = $("#editBtn");
        let update_btn = $("#updateBtn");
        let cancel_btn = $("#cancelBtn");
        let title_input = $("#title");
        let assigned_to_input = $("#assigned_to");
        let description_input = $("#description");
        let time_spent_input = $("#session_time");
        let complete_input = $("#complete");

        let disable = title_input.attr("disabled");

        disable = disable ? false : true;

        edit_btn.attr("hidden", !disable);
        update_btn.attr("hidden", disable);
        cancel_btn.attr("hidden", disable);

        title_input.attr("disabled", disable || isTopFeildDisable);
        assigned_to_input.attr("disabled", disable || isTopFeildDisable);
        description_input.attr("disabled", disable || isTopFeildDisable);
        time_spent_input.attr("disabled", disable || isBottomFeildDisable);
        complete_input.attr("disabled", disable || isBottomFeildDisable);

    }

    return <div style={{padding: "4ex"}}>
        <h2>Task Details</h2>
        <div className="row">
            <div className={"col-3"}>
                <div className={"form-group" + (task.isAssignClicked && !task.title ? " has-error" : "")}>
                    <Label for="title">Title: </Label>
                    <Input type="input" id="title" disabled={true} value={task.title} onChange={input_update}/>
                    {task.isAssignClicked && !task.title &&
                    <div className="help-block">Title is required</div>
                    }
                </div>
            </div>
            <div className={"col-3"}>
                <div className={"form-group" + (task.isAssignClicked && !task.assigned_to ? " has-error" : "")}>
                    <Label for="assigned_to">Assigned to: </Label>
                    <Input type="select" id="assigned_to" disabled={true} value={task.assigned_to} onChange={input_update}>
                        {users}
                    </Input>
                    {task.isAssignClicked && !task.assigned_to &&
                    <div className="help-block">Assignee is required</div>
                    }
                </div>
            </div>
        </div>
        <div className="row">
            <div className={"col-6"}>
                <div className={"form-group" + (task.isAssignClicked && !task.description ? " has-error" : "")}>
                    <Label for="description">Description: </Label>
                    <Input type="textarea" id="description" disabled={true} value={task.description} onChange={input_update}/>
                    {task.isAssignClicked && !task.description &&
                    <div className="help-block">Description is required</div>
                    }
                </div>
            </div>
        </div>
        <div className="row">
            <div className={"col-6"}>
                <FormGroup>
                    <Label for="time">Total Time Spent: </Label>
                    <Input type="number" disabled={true} value={task.time}/>
                </FormGroup>
            </div>
        </div>
        <div className="row">
            <div className={"col-6"}>
                <div className={"form-group" + (task.isAssignClicked && (task.session_time%15 != 0) ? " has-error" : "")}>
                    <Label for="time">Session Time Spent: </Label>
                    <Input type="number" id="session_time" disabled={true} value= {task.session_time} onChange={input_update}/>
                    {task.isAssignClicked && (task.session_time%15 != 0) &&
                    <div className="help-block">Time input should be an increment of 15</div>
                    }
                </div>
            </div>
        </div>
        <div className="row">
            <div className={"col-6"}>
                <FormGroup>
                    <Label for="complete">Completeness: </Label>
                    <input type="checkbox" className={"form-check-input"} disabled={true}
                           id="complete" style={{marginLeft: "10px"}} checked={task.complete}
                           onChange={input_update}/>
                </FormGroup>
            </div>
        </div>
        <button id="editBtn" className="btn btn-primary" onClick={edit_btn_clicked} hidden={false} disabled={task.complete}>Edit</button>
        <button id="updateBtn" className="btn btn-primary" style={{marginLeft: "10px"}} onClick={update_task} hidden={true}>Update</button>
        <button id="cancelBtn" className="btn btn-danger" style={{marginLeft: "10px"}}
                onClick={cancel_btn_clicked} hidden={true}>Cancel
        </button>
    </div>;
}

function state2props(state) {
    console.log("task details state2props", state);
    return {
        token: state.token,
        tasks_details_form: state.tasks_details_form,
        tasks: state.tasks
    };
}

export default connect(state2props)(TaskDetails);