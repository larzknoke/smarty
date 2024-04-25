import { CloudSun } from "@phosphor-icons/react";

function Weather() {
  return (
    <div>
      <div className="rounded-md py-2 p-3 shadow-md flex gap-2 bg-orange-100">
        <CloudSun size={32} />
        <span className="text-3xl font-semibold">24°</span>
        <div className="flex flex-col text-xs">
          <span>6°</span>
          <span>11°</span>
        </div>
      </div>
    </div>
  );
}

export default Weather;
