"use client";
import { FormEvent } from "react";

export default function Home() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("salary");
    console.log(name);
  }

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1>Time vs Salary</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <input type="text" name="salary" />
        <label htmlFor="salary">Monthly salary (after Tax)</label>

        <input type="text" name="hours" />
        <label htmlFor="hours">Hour working per month</label>

        <input type="text" name="price" />
        <label htmlFor="price">Price of product</label>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
