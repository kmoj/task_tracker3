import React from 'react';
import {connect} from "react-redux";
import api from "../api";
import _ from "underscore";
import {FormGroup, Label, Input} from 'reactstrap';
import {Link} from 'react-router-dom';

function Login(props) {

    let loginForm = props.login_form;

    function login_in() {

        let data = {isLoginClicked: true};
        let action = {
            type: "UPDATE_LOGIN_FROM",
            data: data,
        };

        props.dispatch(action);

        if (loginForm.username != "" && loginForm.password != "") {
            let data = {
                username: loginForm.username,
                password: loginForm.password,
            };

            api.login(data);

        }

    }

    function input_update(ev) {

        let target = $(ev.target);
        let data = {};

        data[target.attr("id")] = target.val();
        let action = {
            type: "UPDATE_LOGIN_FROM",
            data: data,
        };

        props.dispatch(action);

    }

    return <div style={{padding: "4ex"}}>
        <div className="row">
            <div className={"col-6"}>
                <div className={"form-group" + (loginForm.isLoginClicked && props.token.token == "loginError" ? " has-error" : "")}>
                    {loginForm.isLoginClicked && props.token.token == "loginError" &&
                    <div className="help-block"><b>Username or Password Incorrect</b></div>
                    }
                </div>
                <div className={"form-group" + (loginForm.isLoginClicked && !loginForm.username ? " has-error" : "")}>
                    <Label for="username">Username: </Label>
                    <span><Input className={loginForm.isLoginClicked && !loginForm.username ? "has-error" : ""}
                                 type="input"
                                 id="username" value={loginForm.username}
                                 onChange={input_update}/></span>
                    {loginForm.isLoginClicked && !loginForm.username &&
                    <div className="help-block">Username is required</div>
                    }
                </div>
                <div className={"form-group" + (loginForm.isLoginClicked && !loginForm.password ? " has-error" : "")}>
                    <Label for="password">Password: </Label>
                    <span><Input type="password" id="password" value={loginForm.password}
                                 onChange={input_update}/></span>
                    {loginForm.isLoginClicked && !loginForm.password &&
                    <div className="help-block">Password is required</div>
                    }
                </div>
            </div>
        </div>
        <button className={"btn btn-primary"} onClick={login_in}>Login</button>
        <Link to="/register" style={{marginLeft: "10px"}} className="btn btn-primary">Sign Up</Link>
    </div>
        ;
}

function state2props(state) {
    //console.log("task form state2props", state);
    return {login_form: state.login_form, token: state.token};
}

export default connect(state2props)(Login);