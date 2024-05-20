import React, { useContext, useEffect, useState } from 'react';
import { MdNotes } from "react-icons/md";
import { MdLabel } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { userContext } from '../../App';

const Sidebar = () => {
    const { state, dispatch } = useContext(userContext);
    const [m, n] = useState({});

    useEffect(() => {
        if (state && state.token) {
            allTask();
        }
    }, [state]);

    const allTask = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v2/alltask", {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            });
            
           n(response.data.tasks) // Assuming the response data contains the tasks
           
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const data = [
        { title: "All tasks", icons: <MdNotes />, direct: "/" },
        { title: "Important tasks", icons: <MdLabel />, direct: "/important" },
        { title: "Completed tasks", icons: <FaCheckDouble />, direct: "/complete" },
        { title: "Incomplete tasks", icons: <TbNotebookOff />, direct: "/incomplete" }
    ];

    const navigate = useNavigate();

    const logout = async () => {
        try {
            localStorage.removeItem("userInfo");
            dispatch({ type: "clear" });
            await axios.post("http://localhost:5000/api/v1/logout");
            alert('You are successfully logged out');
            navigate("/login");
        } catch (err) {
            console.error(err.message);
        }
    };
    
    return (
        <div className='flex flex-col bg-purple-400 p-4 border rounded-lg w-full sm:max-w-xs overflow-hidden'>
            <div className='mb-4'>
                <h2 className="text-lg sm:text-xl font-semibold break-words">{m&&m.name}</h2>
                <h4 className='mb-1 text-gray-400 break-words'>{m&&m.email}</h4>
                <hr />
            </div>
            <div className='space-y-2'>
                {data.map((n, i) => (
                    <Link to={n.direct} key={i} className='break-words flex items-center hover:bg-gray-400 p-2 rounded transition.all variation-300'>{n.icons}{n.title}</Link>
                ))}
            </div>
            <div className="bg-gray-600 w-full p-2 rounded" onClick={logout}>Logout</div>
        </div>
    );
};

export default Sidebar;
