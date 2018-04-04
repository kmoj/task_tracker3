import React from 'react';
import api from "../api";
import {NavLink} from 'react-router-dom';
import {Card, CardBody} from 'reactstrap';
import {connect} from "react-redux";

function Task(props) {

    let task = props.task;

    function clickedDelete() {
        let msg = "Are you sure?"

        if (confirm(msg) == true) {
            api.delete_task(task);
        }
    };

    function clickedDetails() {
        let action = {
            type: "UPDATE_DETAILS_FORM",
            task: task,
        }

        props.dispatch(action);

    };

    return <Card className={task.complete ? "alert alert-success" : "alert alert-warning"}>
        <CardBody>
            <div className={"row"}>
                <div className={"col-6"}>
                    <p><b>Title: </b>{task.title}</p>
                    <p><b>Description: </b>{task.description}</p>
                    { props.col == "assignedToMe" &&
                        <p><b>Assigned by: </b>{task.user.username}</p>
                    }
                    { props.col == "assignedByMe" &&
                    <p><b>Assigned to: </b>{task.assigned_to}</p>
                    }
                </div>
                <div className={"col-3 offset-3"}>
                    <NavLink to={"/taskDetails/" + task.id} exact={true}
                             className="btn btn-primary" onClick={clickedDetails}>Details</NavLink>
                    <button className={"btn btn-danger"} style={{marginTop: "5px"}}
                            onClick={clickedDelete}>Delete
                    </button>
                </div>
            </div>
        </CardBody>
    </Card>;
}

function state2props(state) {
    console.log("task form state2props", state);
    return {token: state.token, new_task_form: state.new_task_form};
}

export default connect(state2props)(Task);