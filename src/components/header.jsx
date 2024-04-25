import {
  List as ListIcon,
  Gear as GearIcon,
  WifiHigh as WifiHighIcon,
} from "@phosphor-icons/react";
import Weather from "./Weather";
import Clock from "./Clock";

function Header() {
  return (
    <div className="p-6 flex gap-4 flex-col">
      <div className="flex justify-between gap-5">
        <ListIcon size={32} className="mr-auto" />
        <WifiHighIcon size={32} />
        <GearIcon size={32} />
      </div>
      <div className="flex justify-between gap-5">
        <Weather />
        <Clock />
      </div>
    </div>
  );
}

export default Header;
