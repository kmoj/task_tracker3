import React from 'react';
import _ from "underscore";
import { Link } from 'react-router-dom';

function User(params) {
    console.log(params);
    return ( <p>{params.user.username} - <Link to={"/users/" + params.user.id}>posts</Link></p>);
}

export default function Users(params) {
    let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} />);
    return (
        <div>
            { users }
        </div>);
}