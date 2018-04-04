import store from "./store";
import _ from "underscore";

class TheServer {

    login(data) {
        $.ajax("/api/v1/token", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: (reps) => {
                let data1 = {
                    username: "",
                    user_id: "",
                    token: "loginError",
                };

                if(reps.token != "") {
                    data1 = reps;

                    let empty_login_form = {
                        username: "",
                        password: "",
                        isLoginClicked: false
                    };

                    let action2 = {
                        type: "UPDATE_LOGIN_FROM",
                        data: empty_login_form,
                    };

                    store.dispatch(action2);
                }

                let action = {
                    type: "SET_TOKEN",
                    token: data1,
                };
                store.dispatch(action);
            }
        });
    }

    request_tasks() {
        $.ajax("/api/v1/tasks", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                let action = {
                    type: "TASKS_LIST",
                    tasks: resp.data,
                };
                store.dispatch(action);
            }
        });
    }

    request_task_by_id(taskId) {
        if (taskId != null || taskId != "") {
            $.ajax("/api/v1/tasks/" + taskId, {
                method: "get",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                success: (resp) => {
                    console.log(resp.data);
                    if (resp.data != null) {
                        let action = {
                            type: "UPDATE_DETAILS_FORM",
                            task: resp.data,
                        };
                        store.dispatch(action);
                    }
                }
            });
        }
    }

    request_users() {
        $.ajax("/api/v1/users", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                let action = {
                    type: "USERS_LIST",
                    users: resp.data,
                };
                store.dispatch(action);
            }
        });
    }

    create_user(user) {
        $.ajax("/api/v1/users", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({user: user}),
            success: (resp) => {
                let action = {
                    type: "ADD_USER",
                    user: resp.data,
                };
                store.dispatch(action);
            }
        });
    }

    create_task(data) {
        $.ajax("/api/v1/tasks", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({task: data}),
            success: (resp) => {
                let action = {
                    type: "ADD_TASK",
                    task: resp.data,
                };
                store.dispatch(action);

                let empty_form = {
                    user_id: data.user_id,
                    title: "",
                    description: "",
                    assigned_to: "",
                    time: 0,
                    complete: false,
                    isAssignClicked: false
                };

                let actionClearNewTaskForm = {
                    type: "UPDATE_FROM",
                    task: empty_form,
                };
                store.dispatch(actionClearNewTaskForm);
                alert("task assigned successfully");
            }
        });
    }

    update_task(task) {
        $.ajax("/api/v1/tasks/" + task.id, {
            method: "put",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({task: task}),
            success: (reps) => {
                console.log("update reps", reps);
                let action = {
                    type: "UPDATE_TASK",
                    task: reps.data,
                };
                store.dispatch(action);
                alert("update successfully");
            }
        });
    }

    delete_task(task) {
        $.ajax("/api/v1/tasks/" + task.id, {
            method: "delete",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: {},
            success: () => {
                let action = {
                    type: "DELETE_TASK",
                    deletedTask: task,
                };
                store.dispatch(action);
            }
        });
    }
}

export default new TheServer();