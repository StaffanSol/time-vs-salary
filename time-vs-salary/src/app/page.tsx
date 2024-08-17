"use client";
import { SliderProps } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { AccessTime } from "@mui/icons-material";
import SliderExtended from "./components/SliderExtended";

const MAX_SALARY = 50000;
const MAX_HOURS = 200;
const MAX_PRICE = 1000;

export default function Home() {
  const [salary, setSalary] = useState(25000);
  const [hours, setHours] = useState(160);
  const [price, setPrice] = useState(500);

  const [showSalaryTextfield, setShowSalaryTextfield] = useState(false);
  const [showHoursTextfield, setShowHoursTextfield] = useState(false);
  const [showPriceTextfield, setShowPriceTextfield] = useState(false);

  function convertDecimalTimeToHMS(decimalHours: number): string {
    const hours = Math.floor(decimalHours);
    const minutes = Math.floor((decimalHours * 60) % 60);
    const seconds = Math.floor((decimalHours * 3600) % 60);

    let hoursString = "";
    let minutesString = `${minutes} minut${minutes === 1 ? "" : "ar"}`;
    let secondsString = "";

    if (hours !== 0) {
      hoursString += `${hours} timm${hours === 1 ? "e" : "ar"}, `;
    }
    if (hours === 0) {
      secondsString += `, ${seconds} sekund${seconds === 1 ? "" : "er"} `;
    }

    return `${hoursString}${minutesString}${secondsString}`;
  }

  const payPerHour = salary / hours;
  const timeInHours = price / payPerHour;
  const result = convertDecimalTimeToHMS(timeInHours);

  function updateSalary(event: Event) {
    const target = event.target as HTMLInputElement;
    setSalary(+target.value);
  }

  function updateHours(event: Event) {
    const target = event.target as HTMLInputElement;
    setHours(+target.value);
  }

  function updatePrice(event: Event) {
    const target = event.target as HTMLInputElement;
    setPrice(+target.value);
  }

  const salarySliderSetting: SliderProps = {
    "aria-label": "Always visible",
    onChange: updateSalary,
    value: salary,
    step: 100,
    valueLabelDisplay:
      salary > MAX_SALARY || showSalaryTextfield ? "off" : "on",
    max: MAX_SALARY,
  };

  const hoursSliderSetting: SliderProps = {
    "aria-label": "Always visible",
    onChange: updateHours,
    value: hours,
    step: 1,
    valueLabelDisplay: hours > MAX_HOURS || showHoursTextfield ? "off" : "on",
    max: MAX_HOURS,
  };

  const priceSliderSetting: SliderProps = {
    "aria-label": "Always visible",
    onChange: updatePrice,
    value: price,
    step: 1,
    valueLabelDisplay: price > MAX_PRICE || showPriceTextfield ? "off" : "on",
    max: MAX_PRICE,
  };

  function onSalaryChange(event: ChangeEvent<HTMLInputElement>) {
    setSalary(+event.target.value);
  }

  function onPriceChange(event: ChangeEvent<HTMLInputElement>) {
    setPrice(+event.target.value);
  }

  function onHoursChange(event: ChangeEvent<HTMLInputElement>) {
    setHours(+event.target.value);
  }

  function onSalaryTextfieldUpdate() {
    if (showSalaryTextfield && salary > MAX_SALARY) {
      setSalary(MAX_SALARY);
    }
    setShowSalaryTextfield(!showSalaryTextfield);
  }

  function onPriceTextfieldUpdate() {
    if (showPriceTextfield && price > MAX_PRICE) {
      setPrice(MAX_PRICE);
    }
    setShowPriceTextfield(!showPriceTextfield);
  }

  function onHoursTextfieldUpdate() {
    if (showHoursTextfield && hours > MAX_HOURS) {
      setHours(MAX_HOURS);
    }
    setShowHoursTextfield(!showHoursTextfield);
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-[5vh] gap-4">
      <header className="flex items-center gap-2">
        <div className="flex text-[30px] sm:text-[40px] xl:text-[45px]">
          <AccessTime fontSize="inherit"></AccessTime>
        </div>
        <h1 className="font-bold text-xl sm:text-2xl xl:text-3xl">
          Hur mycket arbetstid kan du spara?
        </h1>
      </header>
      <div className="flex flex-col gap-2 w-full p-8 max-w-2xl rounded overflow-hidden shadow-lg">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-2xl text-center">
            {price && salary && hours ? result : 0}
          </p>
        </div>
        <SliderExtended
          text="Netto månadslön"
          toolipLabel="Lön efter skatt"
          sliderSettings={salarySliderSetting}
          onTextfieldChange={onSalaryChange}
          textfieldValue={salary}
          showTextfield={showSalaryTextfield}
          onToggleTextfiled={onSalaryTextfieldUpdate}
        />
        <SliderExtended
          text="Timmar per månad"
          sliderSettings={hoursSliderSetting}
          onTextfieldChange={onHoursChange}
          textfieldValue={hours}
          showTextfield={showHoursTextfield}
          onToggleTextfiled={onHoursTextfieldUpdate}
        />
        <SliderExtended
          text="Pris på produkt"
          sliderSettings={priceSliderSetting}
          onTextfieldChange={onPriceChange}
          textfieldValue={price}
          showTextfield={showPriceTextfield}
          onToggleTextfiled={onPriceTextfieldUpdate}
        />
      </div>
    </main>
  );
}
