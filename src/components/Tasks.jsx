import { useEffect, useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState();

  async function getTasks() {
    const res = await fetch("/api/tasks", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  }

  useEffect(() => {
    console.log("Fetch Tasks");
    // getTasks();
  });

  return <div>Tasks </div>;
}

export default Tasks;
