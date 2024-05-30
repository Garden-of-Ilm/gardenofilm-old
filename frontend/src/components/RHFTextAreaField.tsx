import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
  placeholder: string;
  className: string;
}

function RHFTextAreaField({ name, placeholder, className }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <textarea {...field} placeholder={placeholder} className={className} />
      )}
    />
  );
}

export default RHFTextAreaField;
