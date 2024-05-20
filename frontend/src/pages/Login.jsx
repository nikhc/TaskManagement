import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../App';

const Login = () => {
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const { state, dispatch } = useContext(userContext);
    const navigate = useNavigate();

    const submitHandler = async () => {
        if (!email || !Password) {
            alert('All fields are required');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/v1/login',
                {
                    email,
                    Password,
                }
            );
            if(response){
                alert('Congratulations! You are logged in. pls click ok to go on application');
                console.log(response.data);
                localStorage.setItem('userInfo', JSON.stringify(response.data.data));
                dispatch({ type: 'USER', payload: response.data.data });
                navigate('/');

            }
            else{
                alert('pls check your credentials i think you giving wrong data')
            }
           
        } catch (error) {
            alert("data is not matching");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="p-4 max-w-md w-full md:w-2/3 lg:w-1/2 rounded bg-gray-800">
                <h2 className="text-3xl font-semibold text-white mb-6 text-center">Login</h2>
                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="bg-gray-700 px-3 py-2 w-full rounded"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="bg-gray-700 px-3 py-2 w-full rounded"
                            name="Password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-blue-400 hover:bg-blue-500 text-xl font-semibold text-black py-2 px-4 rounded"
                        onClick={submitHandler}
                    >
                        Submit
                    </button>
                    <div>
                        <Link to="/signup">Don't have an account? Sign up here.</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
