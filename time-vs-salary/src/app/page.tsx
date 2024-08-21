"use client";
import { SliderProps } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { AccessTime } from "@mui/icons-material";
import SliderExtended from "./components/SliderExtended";
import Image from "next/image";

const MAX_SALARY = 50000;
const MAX_HOURS = 200;
const MAX_PRICE = 1000;

export default function Home() {
  const [salaryString, setSalaryString] = useState<string | null>("25000");
  const [hoursString, setHoursString] = useState<string | null>("160");
  const [priceString, setPriceString] = useState<string | null>("500");

  const salary = salaryString && parseFloat(salaryString);
  const hours = hoursString && parseFloat(hoursString);
  const price = priceString && parseFloat(priceString);

  const [showSalaryTextfield, setShowSalaryTextfield] = useState(false);
  const [showHoursTextfield, setShowHoursTextfield] = useState(false);
  const [showPriceTextfield, setShowPriceTextfield] = useState(false);

  function convertDecimalTimeToHMSOutput(decimalHours: number): string {
    const hours = Math.floor(decimalHours);
    const minutes = Math.floor((decimalHours * 60) % 60);
    const seconds = Math.floor((decimalHours * 3600) % 60);

    let hoursString = "";
    let minutesString = `${minutes} minut${minutes === 1 ? "" : "er"}`;
    let secondsString = "";

    if (hours !== 0) {
      hoursString += `${hours} timm${hours === 1 ? "e" : "ar"}, `;
    }
    if (hours === 0) {
      secondsString += `, ${seconds} sekund${seconds === 1 ? "" : "er"} `;
    }

    return `${hoursString}${minutesString}${secondsString}`;
  }

  const payPerHour = salary && hours && salary / hours;
  const timeInHours = price && payPerHour && price / payPerHour;
  const result = timeInHours && convertDecimalTimeToHMSOutput(timeInHours);

  function updateSalary(event: Event) {
    const target = event.target as HTMLInputElement;
    setSalaryString(target.value);
  }

  function updateHours(event: Event) {
    const target = event.target as HTMLInputElement;
    setHoursString(target.value);
  }

  function updatePrice(event: Event) {
    const target = event.target as HTMLInputElement;
    setPriceString(target.value);
  }

  const salarySliderSetting: SliderProps = {
    "aria-label": "Always visible",
    onChange: updateSalary,
    value: salary === "" || salary === null ? 0 : salary,
    step: 100,
    valueLabelDisplay: showSalaryTextfield ? "off" : "on",
    max: MAX_SALARY,
  };

  const hoursSliderSetting: SliderProps = {
    "aria-label": "Always visible",
    onChange: updateHours,
    value: hours === "" || hours === null ? 0 : hours,
    step: 1,
    valueLabelDisplay: showHoursTextfield ? "off" : "on",
    max: MAX_HOURS,
  };

  const priceSliderSetting: SliderProps = {
    "aria-label": "Always visible",
    onChange: updatePrice,
    value: price === "" || price === null ? 0 : price,
    step: 1,
    valueLabelDisplay: showPriceTextfield ? "off" : "on",
    max: MAX_PRICE,
  };

  function onSalaryChange(event: ChangeEvent<HTMLInputElement>) {
    setSalaryString(event.target.value);
  }

  function onPriceChange(event: ChangeEvent<HTMLInputElement>) {
    setPriceString(event.target.value);
  }

  function onHoursChange(event: ChangeEvent<HTMLInputElement>) {
    setHoursString(event.target.value);
  }

  function onSalaryTextfieldUpdate() {
    if (salary && showSalaryTextfield && salary > MAX_SALARY) {
      setSalaryString(MAX_SALARY.toString());
    }
    setShowSalaryTextfield(!showSalaryTextfield);
  }

  function onPriceTextfieldUpdate() {
    if (price && showPriceTextfield && price > MAX_PRICE) {
      setPriceString(MAX_PRICE.toString());
    }
    setShowPriceTextfield(!showPriceTextfield);
  }

  function onHoursTextfieldUpdate() {
    if (showHoursTextfield && hours && hours > MAX_HOURS) {
      setHoursString(MAX_HOURS.toString());
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
          Hur mycket tid kan du spara?
        </h1>
      </header>
      <div className="flex flex-col gap-2 w-full p-8 max-w-2xl rounded overflow-hidden shadow-lg">
        <div className="flex flex-col gap-3">
          <p className="font-bold sm:text-2xl sm:text-1xl text-center">
            {priceString && salaryString && hoursString ? result : 0}
          </p>
        </div>
        <SliderExtended
          text="Netto månadslön"
          sliderSettings={salarySliderSetting}
          onTextfieldChange={onSalaryChange}
          textfieldValue={salaryString ?? ""}
          showTextfield={showSalaryTextfield}
          onToggleTextfiled={onSalaryTextfieldUpdate}
        />
        <SliderExtended
          text="Timmar per månad"
          sliderSettings={hoursSliderSetting}
          onTextfieldChange={onHoursChange}
          textfieldValue={hoursString ?? ""}
          showTextfield={showHoursTextfield}
          onToggleTextfiled={onHoursTextfieldUpdate}
        />
        <SliderExtended
          text="Pris på produkt"
          sliderSettings={priceSliderSetting}
          onTextfieldChange={onPriceChange}
          textfieldValue={priceString ?? ""}
          showTextfield={showPriceTextfield}
          onToggleTextfiled={onPriceTextfieldUpdate}
        />
      </div>
      <div className="mt-10">
        <a
          href="https://discord.gg/PeRDkb76aV"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="w-[182px] m-auto hover:bg-[#e3e5ff] p-2 rounded-md bg-gray-100"
            src="/discord-logo-blue.svg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
          <p className="text-xs text-gray-500 text-center mt-[2px]">
            Gå med i en av Sverige största programmerings communities
          </p>
        </a>
      </div>
    </main>
  );
}
