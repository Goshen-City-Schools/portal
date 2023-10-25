"use client";

import React, { useState } from "react";
import CalendarWidget from "react-calendar";
import "./Calendar.css";

export default function Calendar() {
  const [value, setValue] = useState(new Date());

  const handleDateChange = (date) => {
    if (date !== null) {
      setValue(date);
    }
  };

  return (
    <div className="border-gray-300 border-2 rounded-md p-2 bg-white">
      <CalendarWidget
        className={"border-0"}
        onChange={() => handleDateChange}
        value={value}
      />
    </div>
  );
}
