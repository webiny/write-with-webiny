import { React, useState } from "react";
import TaskList from "./components/TaskList";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_TODOS = gql`
  query {
    listTodos {
      data {
        todoItem
        taskCompleted
        id
      }
    }
  }
`;

const ADD_TODOS = gql`
mutation AddTodo($todoItem: String!){
  createTodo(
		data: {
      todoItem: $todoItem
    }
  )
  {data{
    todoItem,
    taskCompleted
  }}
}
`;



function App() {
  //state to manage input field
  const [todo, setTodo] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_TODOS)
  const [addTodo, { isadding, e }] = useMutation(ADD_TODOS);
  
  if (loading) return <p>Getting to_dos...</p>;
  if (error) return <p>An error occurred :(</p>;
  if (isadding) return 'Submitting...';
  if (e) return `Submission error! ${error.message}`;


  return (
    <div className=" h-screen flex justify-center items-center flex-col gap-8">
      <div className=" flex justify-center items-center gap-6">
        <input
          className=" w-72 border-2  rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
          //set value of input field
          value={todo}
          onChange={(e) => {
            //update state on changes to text
            setTodo(e.target.value);
          }}
          placeholder="Enter a new task"
        />
        <button
          className=" h-full px-5 py-2 bg-[#0264F6] text-white font-medium rounded-md"
          onClick={() => {
            //execute function to add new todo to the list
            addTodo({ variables: { todoItem: todo } });
            refetch();
            setTodo("");
          }}
        >
          Add Todo Item
        </button>
      </div>
      {/* passing data to TaskList */}
      <TaskList todos={data} gettodo={GET_TODOS}/>
    </div>
  );
}
export default App;
