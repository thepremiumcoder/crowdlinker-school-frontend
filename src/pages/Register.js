import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';


const Register = () => {
    const history = useHistory();
    
    //redirect if authenticated
    useEffect(() => {
        if (localStorage.getItem("authenticated-user")) {
            history.push("/");
        }
    }, [history])
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationError, setError] = useState([]);

    //User Registration : Post User Registration Data
    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const content = await response.json();

        //Redirect to the login page if registration is successful else display the error
        if (response.status === 406)
        {
            setError(content.validate_err.email);
        }
        else
        {
            history.push("/login");
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
                                    <h4>USER REGISTRATION
                                    </h4>
                                </div>

                                <div className="card-body">
                                    <form onSubmit={submit}>
                                        <h6 className="h5 mb-3 fw-normal text-center">Please fill the form below</h6>

                                        <input className="form-control mb-3" placeholder="Name" required
                                            onChange={e => setName(e.target.value)}
                                        />

                                        <input type="email" className="form-control mb-3" placeholder="Email address" required
                                            onChange={e => setEmail(e.target.value)}
                                        />

                                        <input type="password" className="form-control mb-3" placeholder="Password" required
                                            onChange={e => setPassword(e.target.value)}
                                        />

                                        <span className="text-danger text-center">{registrationError}</span>

                                        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Submit</button>
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

export default Register;
