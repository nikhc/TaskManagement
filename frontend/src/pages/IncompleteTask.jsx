import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../components/home/Cards';

const IncompleteTask = () => {
  const [data, setData] = useState([]);
  const m = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchIncompleteTasks = async () => {
      if (!m || !m.token) {
        console.error('User not authenticated');
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/v2/incompletedtasks", {
          headers: {
            'Authorization': `Bearer ${m.token}`
          }
        });

        if (response.data.tasks) {
          setData(response.data.tasks);
        } else {
          console.error('No tasks found');
        }
      } catch (error) {
        console.error('Error fetching incomplete tasks:', error);
      }
    };

    fetchIncompleteTasks();
  }, [m]);

  return (
    <div>
      <Cards home="false" data={data}  />
    </div>
  );
}

export default IncompleteTask;
