import React, { useState } from "react";
import { useAuthContext } from "@/guard/AuthContext";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import { TriangleAlert } from "lucide-react";

export default function LoginForm() {
  const { login, error } = useAuthContext();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(formValues.email, formValues.password);
  };

  return (
    <form
      className="flex w-[28rem] max-w-7xl flex-col gap-5 border border-slate-400/75 px-[36px] py-[16px] pb-[32px] md:rounded-xl"
      onSubmit={handleSubmit}
    >
      <Image
        className="mx-auto mt-2"
        src="/logo.png"
        alt="Garden of Ilm logo"
        width={90}
        height={90}
      />
      <div className="mt-2 text-xl font-semibold">Sign in as admin</div>

      <div className="mt-2 grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          className="border-slate-400"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mt-2 grid w-full items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          className="border-slate-400"
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          required
        />
      </div>

      <Button className="mt-2" type="submit">
        Submit
      </Button>

      {error && (
        <div className="mt-2 flex items-center justify-center gap-[16px] bg-red-100 p-[12px] font-medium text-red-500">
          <TriangleAlert className="h-6 w-6" />
          Invalid Password
        </div>
      )}
    </form>
  );
}
