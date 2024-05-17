function Clock() {
  return (
    <div className="flex flex-col">
      <span className="text-right">
        {new Date().toLocaleDateString("de-DE")}
      </span>
      <span className="text-4xl font-semibold">
        {new Date().toLocaleTimeString([], { timeStyle: "short" })}
      </span>
    </div>
  );
}

export default Clock;
