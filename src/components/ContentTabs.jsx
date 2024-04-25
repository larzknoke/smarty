import { motion } from "framer-motion";
import { useState } from "react";
import { HouseLine } from "@phosphor-icons/react";

let tabs = [
  { id: "home", label: <HouseLine size={32} /> },
  { id: "ny", label: "N.Y." },
  { id: "business", label: "Business" },
  { id: "arts", label: "Arts" },
  { id: "science", label: "Science" },
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
            activeTab === tab.id ? "" : "hover:text-slate-500"
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
