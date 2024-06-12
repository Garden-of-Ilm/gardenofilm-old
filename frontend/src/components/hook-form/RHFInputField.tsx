import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
  placeholder: string;
}

function RHFInputField({ name, placeholder }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <input {...field} type="text" placeholder={placeholder} />
      )}
    />
  );
}

export default RHFInputField;
