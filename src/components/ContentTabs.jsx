import { motion } from "framer-motion";
import { useState } from "react";

export default function ContentTabs({ tabs, activeTab, handleTab }) {
  return (
    <div className="flex space-x-16 fixed bottom-10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTab(tab.id)}
          className={`${
            activeTab === tab.id ? "" : "hover:text-slate-600"
          } relative rounded-full px-4 py-2 text-sm font-medium text-slate outline-slate-800 transition focus-visible:outline-2`}
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
