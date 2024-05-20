const express=require("express")
const { createTask, deleteTask, getAllTask, updateCompleteTask, updateImpTask, updateTask,getImportantTasks, getCompletedTasks, getIncompleteTasks } =require("../controller/taskController") ;
const protectRoute=require("../middlewares/protectroute")


const taskRouter=express.Router();
taskRouter.route("/deleteTask/:taskId").delete(deleteTask)




taskRouter.use(protectRoute)
taskRouter.route("/createTask").post(createTask)
taskRouter.route("/alltask").get(getAllTask)
taskRouter.route("/updateCTask/:taskId").patch(updateCompleteTask)
taskRouter.route("/updateITask/:taskId").patch(updateImpTask)
taskRouter.route("/deleteTask/:taskId").delete(deleteTask)
taskRouter.route("/updateTask/:taskId").patch(updateTask)
taskRouter.route("/importanttask").get(getImportantTasks)

taskRouter.route('/completedtasks').get(getCompletedTasks);

// Route to get incomplete tasks
taskRouter.route('/incompletedtasks').get(getIncompleteTasks);


module.exports=taskRouter




