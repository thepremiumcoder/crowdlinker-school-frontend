import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";

const Login = (props) => {
    const history = useHistory();
    
    //redirect if authenticated
    useEffect(() => {
        if (localStorage.getItem("authenticated-user")) {
            history.push("/");
        }
    }, [history])
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setError] = useState([]);
    
    //User Login : Post User Login Data
    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });
        
        //Redirect to homepage if login is successful else display the error
        if (response.status === 200)
        {
            const content = await response.json();
            props.setName(content.name);
            localStorage.setItem("authenticated-user", JSON.stringify(content));
            history.push("/");
        }
        else
        {
            setError(response.statusText);
        }
        
    }

    
    return (
        <div>
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h4>SIGN IN
                                    </h4>
                                </div>

                                <div className="card-body">
                                    <form onSubmit={submit}>
                                        <p className="h5 mb-3 fw-normal text-center">Please Input your credentials below</p>
                                        <input type="email" className="form-control mb-3" placeholder="Email address" required
                                            onChange={e => setEmail(e.target.value)}
                                        />

                                        <input type="password" className="form-control mb-3" placeholder="Password" required
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        <span className="text-danger text-center">{loginError}</span>

                                        <button className="w-100 btn btn-primary mt-3" type="submit">Sign in</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
