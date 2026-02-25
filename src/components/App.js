import React, { useState } from "react";
import "../styles/App.css";

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const App = () => {
  const [month, setMonth] = useState(1); // February (0-based)
  const [year, setYear] = useState(2023);
  const [isEditingYear, setIsEditingYear] = useState(false);

  // 📅 Calendar calculations
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = [];

  // Empty cells before 1st day
  for (let i = 0; i < firstDay; i++) {
    days.push("");
  }

  // Actual dates
  for (let d = 1; d <= totalDays; d++) {
    days.push(d);
  }

  // Fill remaining cells
  while (days.length % 7 !== 0) {
    days.push("");
  }

  // Split into weeks
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // ⏮️⏭️ Navigation handlers
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const prevYear = () => setYear(year - 1);
  const nextYear = () => setYear(year + 1);

  return (
    <div id="main">
      <h1 id="calendar-heading">Calendar</h1>

      <div>
        <select
          id="month-select"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map((m, index) => (
            <option key={index} value={index}>
              {m}
            </option>
          ))}
        </select>

        {isEditingYear ? (
          <input
            id="year-input"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            onBlur={() => setIsEditingYear(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsEditingYear(false);
            }}
          />
        ) : (
          <span
            id="year-text"
            onDoubleClick={() => setIsEditingYear(true)}
          >
            {year}
          </span>
        )}
      </div>

      <hr />

      <div id="calendar">
        <table id="calendar-table">
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, i) => (
              <tr key={i}>
                {week.map((day, j) => (
                  <td key={j}>{day}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr />

      <div id="navigation">
        <button id="prev-year" onClick={prevYear}>&lt;&lt;</button>
        <button id="prev-month" onClick={prevMonth}>&lt;</button>
        <button id="next-month" onClick={nextMonth}>&gt;</button>
        <button id="next-year" onClick={nextYear}>&gt;&gt;</button>
      </div>
    </div>
  );
};

export default App;