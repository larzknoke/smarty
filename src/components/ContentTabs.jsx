import { motion } from "framer-motion";
import { useState } from "react";
import {
  HouseLine,
  ListChecks,
  ChargingStation,
  WashingMachine,
} from "@phosphor-icons/react";

let tabs = [
  { id: "home", label: <HouseLine size={32} /> },
  { id: "todos", label: <ListChecks size={32} /> },
  { id: "pv", label: <ChargingStation size={32} /> },
  { id: "housekeeping", label: <WashingMachine size={32} /> },
];

export default function ContentTabs() {
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`${
            activeTab === tab.id ? "" : "hover:text-slate-600"
          } relative rounded-full px-3 py-1.5 text-sm font-medium text-slate outline-slate-800 transition focus-visible:outline-2`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-[-1] bg-orange-100 mix-blend-differenceOFF "
              style={{ borderRadius: 4 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
