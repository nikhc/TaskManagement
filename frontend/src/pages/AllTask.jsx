import React, { useState, useEffect } from 'react';
import Cards from '../components/home/Cards';
import { IoAddCircleSharp } from "react-icons/io5";
import Inputdata from '../components/home/Inputdata';
import axios from "axios";

const AllTask = () => {
  const [inputdiv, setinputdiv] = useState("hidden");
  const [data, setData] = useState([]);
  const[updatedData,setUpdatedData]=useState({})
  const m = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const allTask = async () => {
      try {
        const response = await axios.get("https://taskmanagement-5vu3.onrender.com/api/v2/alltask", {
          headers: {
            'Authorization': `Bearer ${m.token}`
          }
        });
        setData(response.data.tasks.tasks); // Assuming the response data contains the tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    allTask();
  },[m]);

  return (
    <>
      <div>
        <div className="w-full flex justify-end p-4">
          <button onClick={() => setinputdiv("fixed")}>
            <IoAddCircleSharp className="text-5xl text-gray-300" />
          </button>
        </div>
        {data && <Cards home="true" niku={setinputdiv} data={data} setData={setData} setUpdatedData={setUpdatedData} />}
      </div>
      <Inputdata nik={inputdiv} niku={setinputdiv} akka={setData} updatedData={updatedData} setUpdatedData={setUpdatedData} />
    </>
  );
};

export default AllTask;
