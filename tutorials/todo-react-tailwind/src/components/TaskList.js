import React from "react";
import { gql, useMutation } from "@apollo/client";

const TaskList = ({ todos, gettodo }) => {
  const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
      deleteTodo(revision: $id) {
        data
      }
    }
  `;

  const UPDATE_TODO = gql`
    mutation UpdateQuery($id: ID!, $completed: Boolean!) {
      updateTodo(
        revision: $id
        data: { taskCompleted: $completed }
      ) {
        data {
          todoItem
          taskCompleted
        }
      }
    }
  `;

  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [
      { query: gettodo }, // DocumentNode object parsed with gql
    ],
  });
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [
      { query: gettodo }, // DocumentNode object parsed with gql
    ],
  });


  return (
    <div className=" w-full text-center flex items-center flex-col gap-5">
      <h1 className=" text-blue-600 uppercase font-semibold text-2xl">
        Task List
      </h1>
      <div className=" w-1/2 bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md">
        {todos &&
          todos.listTodos.data.map(({ id, todoItem, taskCompleted }) => (
            <div className=" flex justify-between items-center mb-5" key={id}>
              <li className={` ${taskCompleted? "line-through": "" } list-none w-2/3 text-left break-normal`}>
                {todoItem}
              </li>
              <div className="flex gap-3">
                <button className=" bg-blue-600 text-white px-2 py-2 font-medium rounded-md"
                onClick={()=>{
                  updateTodo({ variables: { id: id, completed: !taskCompleted } });
                }}
                >
                  {taskCompleted ? "Completed" : "Not Completed"}
                </button>
                <button
                  className=" bg-white text-blue-600 px-2 py-2 font-medium rounded-md"
                  onClick={() => {
                    deleteTodo({ variables: { id: id } });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskList;
