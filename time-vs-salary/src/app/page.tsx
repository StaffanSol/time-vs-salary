"use client";
import { Slider } from "@mui/material";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [salary, setSalary] = useState(0);
  const [hours, setHours] = useState(0);
  const [price, setPrice] = useState(0);

  function convertDecimalToHoursMinutes(decimalHours: number): string {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return `${hours} hours, ${minutes} minutes`;
  }

  const payPerHour = salary / hours;
  const timeInHours = price / payPerHour;
  const result = convertDecimalToHoursMinutes(timeInHours);

  function updateSalary(value: number) {
    setSalary(value);
    return `${value}°C`;
  }

  function updateHours(value: number) {
    setHours(value);
    return `${value}°C`;
  }

  function updatePrice(value: number) {
    setPrice(value);
    return `${value}°C`;
  }

  return (
    <main className="flex min-h-screen flex-col items-center  p-24 gap-4">
      <h1>Time vs Salary</h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-3">
          <div className="">
            <label htmlFor="salary">Monthly salary (after Tax)</label>
            <Slider
              aria-label="Always visible"
              defaultValue={20000}
              getAriaValueText={updateSalary}
              step={100}
              valueLabelDisplay="on"
              max={50000}
            />
          </div>
        </div>
        <div className="">
          <label htmlFor="hours">Hour working per month</label>
          <Slider
            aria-label="Always visible"
            defaultValue={169}
            getAriaValueText={updateHours}
            step={10}
            valueLabelDisplay="on"
            max={200}
          />
        </div>
        <div className="">
          <label htmlFor="price">Price of product</label>
          <Slider
            aria-label="Always visible"
            defaultValue={20}
            getAriaValueText={updatePrice}
            step={1}
            valueLabelDisplay="on"
            max={1000}
          />
        </div>
        <p>Antal timmar: </p>
        <p>{result}</p>
      </div>
    </main>
  );
}
