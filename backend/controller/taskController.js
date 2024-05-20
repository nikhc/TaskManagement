const taskModel=require("../models/taskmodel");
const userModel = require("../models/usermodel");
module.exports.createTask=async function(req,res){
    try{
        console.log(req.id)

        const{title,desc}=req.body;
        const newtask=await taskModel.create({title:title,desc:desc})
        console.log(newtask)
       const n= await userModel.findByIdAndUpdate(req.id)
       n.tasks.push(newtask.id);
       n.save();
       console.log("kjknfkjnkjdnkjcnkjdnckjjnwekjcnknkcnkjnkjnekcnkj")

       console.log("kjknfkjnkjdnkjcnkjdnckjjnwekjcnknkcnkjnkjnekcnkj")
       console.log("kjknfkjnkjdnkjcnkjdnckjjnwekjcnknkcnkjnkjnekcnkj")
       console.log("kjknfkjnkjdnkjcnkjdnckjjnwekjcnknkcnkjnkjnekcnkj")
       console.log("kjknfkjnkjdnkjcnkjdnckjjnwekjcnknkcnkjnkjnekcnkj")
       console.log(n)
        res.json({
            data:newtask

        })


    }
    catch(err){
        res.status(500).json({
            error:err.message
        })
    
    }

}


module.exports.getAllTask = async function (req, res) {
  try {console.log("kndkjnckjndskjcnkjdsnckjnkj")

    const userData = await userModel.findById(req.id).populate("tasks").sort("-createsAt")

    if (!userData) {
      return res.status(404).json({
        error: "User not found"
      });
    }
console.log("d skjnkjdnkjndskjndsjnadjjsnkjnasnkjnask")

console.log("d skjnkjdnkjndskjndsjnadjjsnkjnasnkjnask")
console.log("d skjnkjdnkjndskjndsjnadjjsnkjnasnkjnask")
console.log("d skjnkjdnkjndskjndsjnadjjsnkjnasnkjnask")

console.log(userData+"mn s hjbdshjcbhjdsbhjbdhjssb chjbdshjb")
console.log(userData)
console.log(userData)
console.log(userData)
console.log(userData)
console.log(userData)
console.log(userData)
console.log(userData+"zx xzxjhkjasnkjnasajnkjasnkj")
    res.json({
      tasks: userData
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports.deleteTask = async function (req, res) {
    const { taskId } = req.params;


   
  
    try {
      // Find and delete the task by ID
      const task = await taskModel.findByIdAndDelete(taskId);
      if (!task) {
        return res.status(404).json({
          error: "Task not found"
        });
      }
  
      // Remove the task reference from the user's tasks array
      await userModel.findByIdAndUpdate(
        req.id,
        { $pull: { tasks: taskId } }
      );
  
      res.status(200).json({
        message: "Task deleted successfully"
      });
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  };

  module.exports.updateTask = async function (req, res) {
    const { taskId } = req.params;
    const { title, desc } = req.body;
  
    try {
      // Find and update the task by ID
      const task = await taskModel.findByIdAndUpdate(
        taskId,
        { title, desc },
        { new: true, runValidators: true }
      );
  
      if (!task) {
        return res.status(404).json({
          error: "Task not found"
        });
      }
  
      res.status(200).json({
        message: "Task updated successfully",
        data: task
      });
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  }


  module.exports.updateImpTask = async function (req, res) {
    const { taskId } = req.params;

    console.log(taskId)
  
    try {
      // Find the task by ID
      const task = await taskModel.findById(taskId);
  
      if (!task) {
        return res.status(404).json({
          error: "Task not found"
        });
      }
  
      // Toggle the important field
      task.important = !task.important;
  
      // Save the updated task
      await task.save();
  
      res.status(200).json({
        message: "Task updated successfully",
        data: task
      });
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  };


  

module.exports.updateCompleteTask = async function (req, res) {
  const { taskId } = req.params;

  try {
    // Find the task by ID
    const task = await taskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    // Toggle the complete field
    task.complete = !task.complete;

    // Save the updated task
    await task.save();
    console.log(task)
    console.log(task)
    console.log(task)
    console.log(task)
    console.log(task)

    res.status(200).json({
      message: "Task updated successfully",
      data: task
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};


module.exports.getImportantTasks = async function (req, res) {
  try {
    const userData = await userModel.findById(req.id).populate({
      path: 'tasks',
      match: { important: true },
      options: { sort: { createdAt: -1 } } // Sort by creation date in descending order
    });

    if (!userData) {
      return res.status(404).json({
        error: "User not found"
      });
    }
    console.log(userData.tasks);

    res.status(200).json({
      tasks: userData.tasks
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports.getCompletedTasks = async function (req, res) {
  try {
    const userData = await userModel.findById(req.id).populate({
      path: 'tasks',
      match: { complete: true },
      options: { sort: { createdAt: -1 } } // Sort by creation date in descending order
    });

    if (!userData) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.status(200).json({
      tasks: userData.tasks
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports.getIncompleteTasks = async function (req, res) {
  try {
    const userData = await userModel.findById(req.id).populate({
      path: 'tasks',
      match: { complete: false },
      options: { sort: { createdAt: -1 } } // Sort by creation date in descending order
    });

    if (!userData) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.status(200).json({
      tasks: userData.tasks
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

