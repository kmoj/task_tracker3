import React from 'react';
import {connect} from "react-redux";
import {NavLink, Link, Redirect} from 'react-router-dom';
import {NavItem} from 'reactstrap';
import api from "../api";

function Nav(props) {

    function logOut() {

        let action = {
            type: "SET_TOKEN",
            token: "",
        };

        props.dispatch(action);

    }

    if (props.token.user_id) {

        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand">
              <span className="navbar-brand">
                  <b>Task<br/>Tracker</b>
              </span>
                    <ul className="navbar-nav mr-auto">
                        <NavItem>
                            <Link to="/" strict={true} exact={true} activeClassName="active" className="nav-link">Assign Task</Link>
                        </NavItem>
                        <NavItem style={{marginLeft: "10px"}}>
                            <Link to="/mytasks" strict={true} exact={true} activeClassName="active" className="nav-link">My
                                Tasks</Link>
                        </NavItem>
                    </ul>
              <span className="navbar-text">
                  Hi, {props.token.username} | <Link exact={true} to="/" onClick={logOut}>Log Out</Link>
              </span>
            </nav>
        );
    } else {

        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand">
              <span className="navbar-brand">
                  <b>Task<br/>Tracker</b>
              </span>
            </nav>
        );
    }

}

function state2props(state) {
    //console.log("task form state2props", state);
    return {token: state.token};
}

export default connect(state2props)(Nav);