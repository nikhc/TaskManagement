import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../components/home/Cards';

const ImportantTask = () => {
  const [data, setData] = useState([]);
  const m = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchImportantTasks = async () => {
      if (!m || !m.token) {
        console.error('User not authenticated');
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/v2/importanttask", {
          headers: {
            'Authorization': `Bearer ${m.token}`
          }
        });
        console.log(response);
        if (response.data.tasks) {
          setData(response.data.tasks);
        } else {
          console.error('No tasks found');
        }
      } catch (error) {
        console.error('Error fetching important tasks:', error);
      }
    };

    fetchImportantTasks();
  }, []);

  return (
    <div>
      <Cards home="false" data={data} setData={setData} />
    </div>
  );
}

export default ImportantTask;
