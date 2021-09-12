import React, {useEffect, useState} from 'react';
import './App.css';
import Login from "./pages/Login";
import Nav from "./pages/Nav";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AuthCheck from "./pages/AuthCheck";
import ViewStudent from './pages/ViewStudents';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";

function App() {
    const [name, setName] = useState('');
    
    //fetch details of the logged-in user
    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content = await response.json();
                setName(content.name);
            }
        )();
    });


    //Navigation Routes
    return (
        <div className="App">
            <BrowserRouter>
                <Nav name={name} setName={setName}/>

                <main className="App">
                    <Route path="/login" component={() => <Login setName={setName}/>}/>
                    <Route path="/register" component={() => <Register name={name} />} />
            
                    <Route path="/" exact component={() => <Home name={name}/>}/>
                    
                    <Route path="/students" component={() => <AuthCheck Page={ViewStudent}/>}/>
                    <Route path="/add-student" component={() => <AuthCheck Page={AddStudent}/>}/>
                    <Route path="/edit-student/:id" component={() => <AuthCheck Page={EditStudent}/>}/>
            
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
