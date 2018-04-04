import React from 'react';
import {connect} from "react-redux";
import {NavLink, Link, Redirect} from 'react-router-dom';
import {NavItem} from 'reactstrap';

function Nav(props) {

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
                  Hi, {props.token.username} | <a href={"/"}>Log out</a>
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
    console.log("task form state2props", state);
    return {token: state.token};
}

export default connect(state2props)(Nav);