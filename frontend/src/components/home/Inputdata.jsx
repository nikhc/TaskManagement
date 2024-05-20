import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const Inputdata = ({ nik, niku, akka, updatedData, setUpdatedData }) => {
    const [data, setData] = useState({ title: "", desc: "" });
    const m = JSON.parse(localStorage.getItem("userInfo"));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const submitdata = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/v2/createTask", data, {
                headers: {
                    'Authorization': `Bearer ${m.token}`
                }
            });
            akka(prevData => [...prevData, res.data.data]);
            setData({ title: "", desc: "" });
            niku("hidden");
        } catch (error) {
            console.error('Error creating task:', error.message);
            alert('An error occurred while creating the task. Please try again.');
        }
    };

    const updatethetask = async () => {
        try {
            const res = await axios.patch(`http://localhost:5000/api/v2/updateTask/${updatedData.id}`, data, {
                headers: {
                    'Authorization': `Bearer ${m.token}`
                }
            });
            akka(prevData => prevData.map(task => task._id === res.data.data._id ? res.data.data : task));
            setData({ title: "", desc: "" });
            setUpdatedData({ id: "", title: "", desc: "" });
            niku("hidden");
        } catch (error) {
            console.error('Error updating task:', error.message);
            alert('An error occurred while updating the task. Please try again.');
        }
    };

    useEffect(() => {
        if (updatedData.id) {
            setData({ title: updatedData.title, desc: updatedData.desc });
        }
    }, [updatedData]);

    return (
        <>
            <div className={`${nik} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`} ></div>
            <div className={`${nik} top-0 left-0 flex items-center justify-center h-screen w-full`} >
                <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg relative">
                    <button className="absolute top-4 right-4 text-white hover:text-gray-300" onClick={() => { 
                        niku("hidden"); 
                        setData({ title: "", desc: "" }); 
                        setUpdatedData({ id: "", title: "", desc: "" });
                    }}>
                        <RxCross2 size={24} />
                    </button>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        className="px-3 py-2 rounded w-full bg-gray-700 text-white my-3"
                        value={data.title}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="desc"
                        cols="30"
                        rows="5"
                        placeholder="Enter the description"
                        className="px-3 py-2 rounded w-full bg-gray-700 text-white my-3"
                        value={data.desc}
                        onChange={handleInputChange}
                    ></textarea>
                    {updatedData.id =="" ? (
                        <button className="px-3 py-2 bg-blue-400 rounded text-black text-lg w-full hover:bg-blue-500 transition duration-300" onClick={submitdata}>
                            Submit
                        </button>
                    ) : (
                        <div>
                              {(Object.keys(updatedData).length === 0) ? (
                            <button className="px-3 py-2 bg-blue-400 rounded text-black text-lg w-full hover:bg-blue-500 transition duration-300" onClick={submitdata}>
                                Submit
                            </button>
                        ) : (
                            <button className="px-3 py-2 bg-blue-400 rounded text-black text-lg w-full hover:bg-blue-500 transition duration-300" onClick={updatethetask}>
                                Update
                            </button>
                        )}
                        </div>

                        
                      
                    )}
                </div>
            </div>
        </>
    );
};

export default Inputdata;
