import React from "react";
import { Input, InputProps } from "./Input";

export interface DatePickerProps extends InputProps {}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => <Input type="date" ref={ref} {...props} />
);

DatePicker.displayName = "DatePicker";
