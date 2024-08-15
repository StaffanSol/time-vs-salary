"use client";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Home() {
  const [salary, setSalary] = useState(0);
  const [hours, setHours] = useState(0);
  const [price, setPrice] = useState(0);

  function updateSalary(event: ChangeEvent<HTMLInputElement>) {
    setSalary(+event.target.value);
  }

  function updateHours(event: ChangeEvent<HTMLInputElement>) {
    setHours(+event.target.value);
  }

  function updatePrice(event: ChangeEvent<HTMLInputElement>) {
    setPrice(+event.target.value);
  }

  const payPerHour = salary / hours;
  const timeInHours = price / payPerHour;

  function convertDecimalToHoursMinutes(decimalHours: number): string {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return `${hours} hours, ${minutes} minutes`;
  }
  const result = convertDecimalToHoursMinutes(timeInHours);

  return (
    <main className="flex min-h-screen flex-col items-center  p-24 gap-4">
      <h1>Time vs Salary</h1>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <input
            type="number"
            name="salary"
            onChange={(event) => updateSalary(event)}
          />
          <label htmlFor="salary">Monthly salary (after Tax)</label>
        </div>

        <div className="flex gap-3">
          <input
            type="number"
            name="hours"
            onChange={(event) => updateHours(event)}
          />
          <label htmlFor="hours">Hour working per month</label>
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            name="price"
            onChange={(event) => updatePrice(event)}
          />
          <label htmlFor="price">Price of product</label>
        </div>
        <p>Antal timmar: </p>
        <p>{result}</p>
      </div>
    </main>
  );
}
