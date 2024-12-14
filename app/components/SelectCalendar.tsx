"use client";
import { enUS } from "date-fns/locale";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRange } from "react-date-range";
import { useState } from "react";
import eachDayOfInterval from "date-fns/eachDayOfInterval";

export function SelectCalendar({
  reservation,
}: {
  reservation: { startDate: Date; endDate: Date }[] | undefined; //the [] indicates that reservation is an array of objects where each object has the following structure mentioned that is startDate and endDate. eg different user wil have different start and end date thus making the reservation object an array of objects having start and end as the objects within it
}) {
  // Pass a valid locale
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  let disabledDates: Date[] = [];
  reservation?.forEach((reservationItem) => {
    const dateRange = eachDayOfInterval({
      //eachDayofInterval is a function from the library date-fns which generates an array of all dates within the specified interval
      start: new Date(reservationItem.startDate),
      end: new Date(reservationItem.endDate),
    });
    disabledDates = [...disabledDates, ...dateRange]; //creates a new array that combines the exisiting disabledDates array with the new dateRange array. The spread operator ... takes all the elements from the disabledDates array and the dateRange array and then creates a new array by first including all the current elements of disabledDates and then appends all the elements from the dateRange to the end
  });
  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />
      <DateRange
        locale={enUS}
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#FF5A5F"]} //base color
        ranges={state}
        onChange={(item) => setState([item.selection] as any)}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
      />
    </>
  );
}
