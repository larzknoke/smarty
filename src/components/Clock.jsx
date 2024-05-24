import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState();

  useEffect(() => {
    setTime(new Date().toLocaleTimeString([], { timeStyle: "short" }));
    setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { timeStyle: "short" }));
    }, 60000);
  }, [time]);

  return (
    <div className="flex flex-col">
      <span className="text-right">
        {new Date().toLocaleDateString("de-DE")}
      </span>
      <span className="text-4xl font-semibold">{time}</span>
    </div>
  );
}

export default Clock;
