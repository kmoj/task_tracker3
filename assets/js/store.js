import { createStore, combineReducers } from "redux";
import deepFreeze from "deep-freeze";

function tasks(state= [], action) {
    switch (action.type) {
        case "TASKS_LIST":
            return [...action.tasks];
            break;
        case "ADD_TASK":
            return [action.task, ...state];
            break;
        case "UPDATE_TASK":
            state = state.filter(item => item.id !== action.task.id);
            return [action.task, ...state];
            break;
        case "DELETE_TASK":
            state = state.filter(item => item !== action.deletedTask);
            return state;
            break;
        default:
            return state;
    }
}

let empty_form = {
    user_id: "",
    title: "",
    description: "",
    assigned_to: "",
    time: 0,
    complete: false,
    isAssignClicked: false
};

function new_task_form(state = empty_form, action) {

    switch (action.type) {
        case "UPDATE_FROM":
            return Object.assign({}, state, action.task);
            break;
        case "SET_TOKEN":
            let newState = {
                user_id: action.token.user_id,
                title: "",
                description: "",
                assigned_to: "",
                time: 0,
                complete: false,
                isAssignClicked: false
            };
            return Object.assign({}, state, newState);
            break;
        default:
            return state;
    }
}

let empty_details_form = {
    user_id: "",
    title: "",
    description: "",
    assigned_to: "",
    time: 0,
    session_time: 0,
    complete: false,
    isAssignClicked: false
};

function tasks_details_form(state = empty_details_form, action) {

    switch (action.type) {
        case "UPDATE_DETAILS_FORM":
            return Object.assign({}, state, action.task);
            break;
        case "SET_TOKEN":
            let newState = {
                user_id: action.token.user_id,
                title: "",
                description: "",
                assigned_to: "",
                time: 0,
                session_time: 0,
                complete: false,
                isAssignClicked: false
            };
            return Object.assign({}, state, newState);
            break;
        default:
            return state;
    }
}

function users(state = [], action) {
    switch (action.type) {
        case "USERS_LIST":
            return Object.assign({}, state, action.users);
            break;
        case "ADD_USER":
            return [action.user, ...state];
            break;
        default:
            return state;
    }
}

let empty_token = {
    username: "alice",
    user_id: 1,
    token: "hi",
};

function token(state = "", action) {
    switch (action.type) {
        case "SET_TOKEN":
            return action.token;
            break;
        default:
            return state;
    }
}


let empty_login_form = {
    username: "",
    password: "",
    isLoginClicked: false
};

function login_form(state = empty_login_form, action) {
    switch (action.type) {
        case "UPDATE_LOGIN_FROM":
            return Object.assign({}, state, action.data);
            break;
        default:
            return state;
    }
}

let empty_register_form = {
    username: "",
    password: "",
    confirmPassword: "",
    isRegisterClicked: false
};

function register_form(state = empty_register_form, action) {
    switch (action.type) {
        case "UPDATE_REGISTER_FROM":
            return Object.assign({}, state, action.data);
            break;
        default:
            return state;
    }
}



function root_reducer(state0, action) {
    console.log("state0", state0);
    let reducer = combineReducers({
        users: users,
        token: token,
        tasks: tasks,
        new_task_form: new_task_form,
        tasks_details_form: tasks_details_form,
        login_form: login_form,
        register_form: register_form,
    });
    let state1 = reducer(state0, action);
    console.log("state1", state1);
    return deepFreeze(state1);
}

let store = createStore(root_reducer);

export default store;