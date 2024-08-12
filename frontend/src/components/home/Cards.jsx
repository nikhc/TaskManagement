import React from 'react';
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

export default function Cards({ home, niku, data, setData ,setUpdatedData}) {
  const handleCompleteTask = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.token) {
        throw new Error("User not authenticated");
      }
      const response = await axios.patch(`https://taskmanagement-5vu3.onrender.com/api/v2/updateCTask/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`
        }
      });

      const updatedTask = response.data.data;

      // Update the local state with the updated task
      setData((prevData) =>
        prevData.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error('Error completing task:', error.message);
      alert('An error occurred while completing the task. Please try again.');
    }
  };

  const handleImportant=async(id)=>{

    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo || !userInfo.token) {
          throw new Error("User not authenticated");
        }
        
        const response = await axios.patch(`https://taskmanagement-5vu3.onrender.com/api/v2/updateITask/${id}`, {}, {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`
          }
        });
  
        const updatedTask = response.data.data;
  
        // Update the local state with the updated task
        setData((prevData) =>
          prevData.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      } catch (error) {
        console.error('Error completing task:', error.message);
        alert('An error occurred while completing the task. Please try again.');
      }

  }

  const deleteTask = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.token) {
        throw new Error("User not authenticated");
      }
  
      await axios.delete(`https://taskmanagement-5vu3.onrender.com/api/v2/deleteTask/${id}`, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`
        }
      });
  
      // Remove the deleted task from the local state
      setData((prevData) =>
        prevData.filter((task) => task._id !== id)
      );
    } catch (error) {
      console.error('Error deleting task:', error.message);
      alert('An error occurred while deleting the task. Please try again.');
    }
  };

  function handleUpdate(id,title,desc){
    setUpdatedData({id:id,title:title,desc:desc})
    niku("fixed")

  }
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data && data.map((item, i) => (
        <div key={i} className="flex flex-col justify-between bg-gray-800 p-4 rounded shadow-lg h-full">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
          <div className="mt-4 w-full flex flex-col sm:flex-row items-center sm:justify-between">
            <button
              className={`p-2 rounded text-white transition duration-300 ease-in-out w-full sm:w-auto sm:flex-grow mr-0 sm:mr-2 mb-2 sm:mb-0 ${item.complete ? "bg-green-400 hover:bg-green-500" : "bg-red-400 hover:bg-red-500"}`}
              onClick={() => handleCompleteTask(item._id)}
            >
              {item.complete ? "Completed" : "Incomplete"}
            </button>
            <div className="flex space-x-2">
              <button className="text-white hover:text-gray-300" onClick={()=>handleImportant(item._id)}>{item.important==false?<CiHeart size={20} /> :<FaHeart  className="text-red-500" />}</button>
              <button className="text-white hover:text-gray-300" onClick={()=>handleUpdate(item._id,item.title,item.desc)}><FaEdit size={20} /></button>
              <button className="text-white hover:text-gray-300" onClick={()=>{deleteTask(item._id)}}><MdDelete size={20} /></button>
            </div>
          </div>
        </div>
      ))}
      {home === "true" && (
        <button className="flex flex-col justify-center items-center bg-gray-800 p-4 rounded shadow-lg h-full" onClick={() => niku("fixed")}>
          <IoAddCircleSharp className="text-5xl text-gray-300" />
          <h2 className="text-2xl mt-4 text-gray-300">Add New Task</h2>
        </button>
      )}
    </div>
  );
}
