import { DUMMY_TASKS } from "@/utils/dummyData";
import { Task } from "@/utils/types";
import React, { useState } from "react";

var context: {
  tasks: Task[];
  actions: {
    add: (newTask: any) => void;
    edit: (taskIndex: any) => void;
    delete: (taskIndex: any) => void;
  };
} = {
  tasks: [],
  actions: {
    add: (newTask: any) => {},
    edit: (taskIndex: any) => {},
    delete: (taskIndex: any) => {},
  },
};

export const TasksContext = React.createContext(context);

export default (props: any) => {
  const [tasksList, setTasksList] = useState(DUMMY_TASKS);

  const addTask = async (newTask: any) => {
    // setTasksList((currentTasksList: any) => {
    //   return [...currentTasksList, newTask];
    // });
    await fetch("mongodb://127.0.0.1:27017", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
  };

  const editTask = async (taskIndex: any) => {
    const taskId = tasksList[taskIndex].id;
    // setTasksList((currentTasksList: any) => {
    //   return [...currentTasksList];
    // });
    await fetch("mongodb://127.0.0.1:27017" + taskId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const deleteTask = async (taskId: any) => {
    await fetch("mongodb://127.0.0.1:27017" + taskId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    //setTasksList(tasksList.filter((task: any) => task.id !== taskId));
    /*setTasksList((currentTasksList: any) => {
      return [...currentTasksList.tasks].slice(taskIndex, 1);
    });*/
  };

  return (
    <TasksContext.Provider
      value={{
        tasks: tasksList,
        actions: { add: addTask, edit: editTask, delete: deleteTask },
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};
