import React from "react";

export const ControlPanel = ({ todos, filterTasks }) => {
  let count = todos.filter((todo) => !todo.checked);

  return (
    <div>
      <p>Item left:{count.length} </p>
      <button onClick={() => filterTasks("all")}>All</button>
      <button onClick={() => filterTasks("active")}>Active</button>
      <button onClick={() => filterTasks("completed")}>Completed</button>
      <button onClick={() => filterTasks("clear")}>Clear Completed</button>
    </div>
  );
};
