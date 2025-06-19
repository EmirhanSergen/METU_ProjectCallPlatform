import React from "react";
import { Input, InputProps } from "./Input";

export interface FileInputProps extends InputProps {}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (props, ref) => <Input type="file" ref={ref} {...props} />
);

FileInput.displayName = "FileInput";
