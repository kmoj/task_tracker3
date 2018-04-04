import React from 'react';
import {connect} from "react-redux";
import api from "../api";
import _ from "underscore";
import {FormGroup, Label, Input} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';

function RegisterForm(props) {

    let registerForm = props.register_form;

    function register() {

        let backBtn = $("#backBtn");
        let data = {isRegisterClicked: true};
        let action = {
            type: "UPDATE_REGISTER_FROM",
            data: data,
        };

        props.dispatch(action);

        if(isInputValid()) {

            let user = {
                username: registerForm.username,
                password_hash: registerForm.password,
            }

            api.create_user(user);

            let empty_register_form = {
                username: "",
                password: "",
                confirmPassword: "",
                isRegisterClicked: false
            };

            let action2 = {
                type: "UPDATE_REGISTER_FROM",
                data: empty_register_form,
            };

            props.dispatch(action2);

            alert("user registered successfully");
            //return <Redirect to="/"/>;
            window.location.href = "/";
            //window.history.pushState("", "", "/");
            //ChangeUrl("page1", "/");
            //backBtn.trigger("click");

        }

    }

    // function ChangeUrl(page, url) {
    //     if (typeof (history.pushState) != "undefined") {
    //         var obj = {Page: page, Url: url};
    //         history.pushState(obj, obj.Page, obj.Url);
    //     } else {
    //         window.location.href = "/";
    //         // alert("Browser does not support HTML5.");
    //     }
    // }


    function isInputValid() {

        let flag = true;

        if(registerForm.username == "" || registerForm.password == "" || registerForm.confirmPassword == "") {
            flag = false;
        }

        if(isUsernameExist()) {
            flag = false;
        }

        if(registerForm.password.length < 8) {
            flag = false;
        }

        if(registerForm.password != registerForm.confirmPassword) {
            flag = false;
        }

        return flag;
    }

    function isUsernameExist() {

        let temp_user = _.filter(props.users, (user) => user.username == registerForm.username);

        if(temp_user.length > 0) {
            return true;
        } else {
            return false;
        }

    }

    function input_update(ev) {

        let target = $(ev.target);
        let data = {};

        data[target.attr("id")] = target.val();
        let action = {
            type: "UPDATE_REGISTER_FROM",
            data: data,
        };

        props.dispatch(action);

    }

    //let users = _.map(props.users, (user) => <option key={user.id} value={user.username}>{user.username}</option>);
    return <div style={{padding: "4ex"}}>
        <div className="row">
            <div className={"col-6"}>
                <div className={"form-group" + (registerForm.isRegisterClicked && !isInputValid() ? " has-error" : "")}>
                    <Label for="username">Username: </Label>
                    <span><Input type="input"
                                 id="username" value={registerForm.username}
                                 onChange={input_update}/></span>
                    {registerForm.isRegisterClicked && !registerForm.username &&
                    <div className="help-block">Username is required</div>
                    }
                    {registerForm.isRegisterClicked && isUsernameExist(registerForm.username) &&
                    <div className="help-block">Username is taken</div>
                    }
                </div>
                <div className={"form-group" + (registerForm.isRegisterClicked && !isInputValid() ? " has-error" : "")}>
                    <Label for="password">Password: </Label>
                    <span><Input type="password" id="password" value={registerForm.password}
                                 onChange={input_update}/></span>
                    {registerForm.isRegisterClicked && registerForm.password.length < 8 &&
                    <div className="help-block">Password should have at least 8 characters</div>
                    }
                </div>
                <div className={"form-group" + (registerForm.isRegisterClicked && !isInputValid() ? " has-error" : "")}>
                    <Label for="confirmPassword">Confirm Password: </Label>
                    <span><Input type="password" id="confirmPassword" value={registerForm.confirmPassword}
                                 onChange={input_update}/></span>
                    {registerForm.isRegisterClicked && registerForm.password !== registerForm.confirmPassword&&
                    <div className="help-block">Passwords didn't match</div>
                    }
                </div>
            </div>
        </div>
        <button className={"btn btn-primary"} onClick={register}>Register</button>
        <Link id= "backBtn" to="/" style={{marginLeft: "10px"}} className="btn btn-primary">Back</Link>
    </div>
        ;
}

function state2props(state) {
    console.log("task form state2props", state);
    return {register_form: state.register_form, users: state.users};
}

export default connect(state2props)(RegisterForm);