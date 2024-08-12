import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../components/home/Cards';

const CompleteTask = () => {
  const [data, setData] = useState([]);
  const m = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      if (!m || !m.token) {
        console.error('User not authenticated');
        return;
      }

      try {
        const response = await axios.get("https://taskmanagement-5vu3.onrender.com/api/v2/completedtasks", {
          headers: {
            'Authorization': `Bearer ${m.token}`
          }
        });

        setData(response.data.tasks); // Assuming the response data contains the tasks
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    };

    fetchCompletedTasks();
  }, [m]); // Dependency array to trigger effect when `m` changes

  return (
    <div>
      <Cards home="false" data={data} />
    </div>
  );
}

export default CompleteTask;

