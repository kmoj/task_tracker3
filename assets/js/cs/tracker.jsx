import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {connect} from "react-redux";
import api from "../api";
import _ from "underscore";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Nav from './nav';
import Login from "./login"
import TaskForm from './task-form';
import Tasks from './tasks';
import TaskDetails from "./task-details";
import RegisterForm from "./register";
import Task from "./task";
import Users from './users';

export default function tracker_init(store) {
    //console.log("store ", store);
    ReactDOM.render(
        <Provider store={store}>
            <TaskTracker/>
        </Provider>,
        document.getElementById('root')
    );
}

let TaskTracker = connect((state) => state)((props) => {
    //props.token.user_id
    if (props.token.user_id) {
        return (
            <Router>
                <div>
                    <Nav/>
                    <Route path="/" exact={true} strict={true} render={() =>
                        <div>
                            <TaskForm users={props.users}/>
                        </div>
                    }/>
                    <Route path="/mytasks" exact={true} strict={true} render={() =>
                        <div className={"row"}>
                            <div className={"col-6"}>
                                <h3>Tasks Assigned To Me: </h3>
                                <Tasks col={"assignedToMe"} tasks={_.filter(props.tasks, (task) =>
                                    props.token.username == task.assigned_to)
                                }/>

                            </div>
                            <div className={"col-6"}>
                                <h3>Tasks Assigned By Me: </h3>
                                <Tasks col={"assignedByMe"} tasks={_.filter(props.tasks, (task) =>
                                    props.token.user_id == task.user.id)
                                }/>
                            </div>
                        </div>
                    }/>
                    <Route path="/taskDetails/:id" strict={true} render={({match}) =>
                        <TaskDetails taskId={match.params.id} users={props.users}/>
                    }/>
                </div>
            </Router>
        );
    } else {
        return (
            <Router>
                <div>
                    <Nav/>
                    <Route strict={true}  path="/" exact={true} render={() =>
                        <div>
                            <Login />
                        </div>
                    }/>
                    <Route strict={true} path="/register" exact={true} render={() =>
                        <div>
                            <RegisterForm />
                        </div>
                    }/>
                </div>
            </Router>);
    }

});