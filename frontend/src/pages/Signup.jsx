import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async () => {
        if (!name || !email || !Password || !confirmPassword) {
            alert("All fields are required.");
            return;
        }
        if (Password !== confirmPassword) {
            alert("Password and confirm password do not match.");
            return;
        }
        console.log(name, email, Password);
        try {
            const { data } = await axios.post(
                "https://taskmanagement-5vu3.onrender.com/api/v1/signup",
                {
                    name,
                    email,
                    Password,
                }
            );
            alert(`${data.data.name},you are successfuly signup pls click ok to navigate on login page` )
          navigate("/login");
        } catch (error) {
            console.error(error);
            alert(error.response.data.error);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-900'>
            <div className='p-4 max-w-md w-full md:w-2/3 lg:w-1/2 rounded bg-gray-800'>
                <h2 className='text-3xl font-semibold text-white mb-6 text-center'>Signup</h2>
                <div className='space-y-4'>
                    <div>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            className='bg-gray-700 px-3 py-2 w-full rounded'
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            className='bg-gray-700 px-3 py-2 w-full rounded'
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="Password"
                            placeholder='Enter Password'
                            className='bg-gray-700 px-3 py-2 w-full rounded'
                            name="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            className='bg-gray-700 px-3 py-2 w-full rounded'
                            name="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className='bg-blue-400 hover:bg-blue-500 text-xl font-semibold text-black py-2 px-4 rounded'
                        onClick={submitHandler}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
