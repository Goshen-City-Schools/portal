import React from "react";

export default function IconComponent({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="icon h-6 w-6 flex items-center justify-center"
    >
      {children}
    </div>
  );
}
