import React from "react";

import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ children, setOpen, open }: Props) {
  return (
    <div
      onClick={() => setOpen(false)}
      className={clsx(
        "fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full items-center justify-center bg-[#00000044] transition-all duration-300 ease-in-out",
        {
          "pointer-events-auto opacity-100": open,
          "pointer-events-none opacity-0": !open,
        },
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-[12px] bg-white p-[24px] shadow-2xl"
      >
        {children}
      </div>
    </div>
  );
}
