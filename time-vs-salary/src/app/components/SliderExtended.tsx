import { Close, EditOutlined } from "@mui/icons-material";
import { IconButton, Slider, SliderProps, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

type SliderExtendedProps = {
  text: string;
  textfieldValue: string;
  showTextfield: boolean;
  sliderSettings: SliderProps;
  onTextfieldChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onToggleTextfiled: () => void;
};

function SliderExtended(props: SliderExtendedProps) {
  function numFormatter(value: number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return (
    <div>
      <div className="flex gap-1 ">
        <div className="flex gap-1 align-middle items-center ">
          <label htmlFor="salary">{props.text}</label>
        </div>
        <span className="flex gap-1 opacity-65 text-lg">
          <IconButton onClick={() => props.onToggleTextfiled()}>
            {props.showTextfield ? (
              <Close></Close>
            ) : (
              <EditOutlined></EditOutlined>
            )}
          </IconButton>
          {props.showTextfield && (
            <TextField
              size="small"
              placeholder={props.text}
              sx={{ width: "150px" }}
              onChange={props.onTextfieldChange}
              value={props.textfieldValue}
              type="number"
            ></TextField>
          )}
        </span>
      </div>
      <Slider
        {...props.sliderSettings}
        valueLabelFormat={(value) => <div>{numFormatter(value)}</div>}
      />
    </div>
  );
}

export default SliderExtended;
