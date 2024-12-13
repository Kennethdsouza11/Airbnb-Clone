"use client";
import { enUS } from "date-fns/locale";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRange } from "react-date-range";
import { useState } from "react";

export function SelectCalendar() {
  // Pass a valid locale
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  return (
    <DateRange
      locale={enUS}
      date={new Date()}
      showDateDisplay={false}
      rangeColors={["#FF5A5F"]} //base color
      ranges={state}
      onChange={(item) => setState([item.selection] as any)}
      minDate={new Date()}
      direction="vertical"
    />
  );
}
