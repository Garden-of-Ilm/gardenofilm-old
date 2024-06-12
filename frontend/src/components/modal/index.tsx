import React from "react";

import styles from "./modal.module.css";

interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ children, setOpen, open }: Props) {
  return (
    <div
      onClick={() => setOpen(false)}
      className={
        styles.modalWrapper +
        ` ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`
      }
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.modalContent}>
        {children}
      </div>
    </div>
  );
}
