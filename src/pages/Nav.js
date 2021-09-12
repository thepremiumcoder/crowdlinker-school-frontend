import React from 'react';
import {Link} from "react-router-dom";

const Nav = (props) => {
    const logout = async () => {
        //Logout user
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });

        props.setName('');
        localStorage.clear();
    }

    let menu;

    
    if (props.name === '') {
        //Menu for Unauthenticated Users
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    } else {
        //Menu for Unauthenticated Users
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/students">List Students</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/add-student">Add Student</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/login" className="nav-link" onClick={logout}>Logout</Link>
                    </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">CrowdLinker School</Link>

                <div>
                    {menu}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
