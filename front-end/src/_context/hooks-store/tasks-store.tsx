import { DUMMY_TASKS } from "@/utils/dummyData";
import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    ADD: (curState: any, newTask: any) => {
      const updatedTasks = [...curState.tasks, newTask];
      return { tasks: updatedTasks };
    },
    COMPLETE: (curState: any, taskIndex: any) => {
      const updatedTasks = [...curState.tasks];
      console.log("COMPLETING");
      updatedTasks[taskIndex] = {
        ...curState.tasks[taskIndex],
        completedStatus: true,
      };

      console.log(updatedTasks[taskIndex]);
      return { tasks: updatedTasks };
    },
    DELETE: (curState: any, taskId: any) => {
      const updatedTasks = [...curState.tasks].filter(
        (task) => task.id !== taskId
      );
      return { tasks: updatedTasks };
    },
  };
  initStore(actions, {
    tasks: DUMMY_TASKS,
  });
};

export default configureStore;
