import React from "react";
import {
  FormProvider as Form,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

type Props = {
  readonly children: React.ReactNode;
  readonly methods: UseFormReturn<any>;
  readonly onSubmit?: SubmitHandler<any>;
  readonly className?: string;
};

export default function FormProvider({
  children,
  onSubmit,
  methods,
  className,
}: Props) {
  return (
    <Form {...methods}>
      <form className={className} onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  );
}
