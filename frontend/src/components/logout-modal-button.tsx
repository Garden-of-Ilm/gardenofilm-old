import { useState } from "react";

import { useAuthContext } from "@/guard/AuthContext";

import Modal from "./modal";

export default function LogoutModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { logOut } = useAuthContext();

  return (
    <>
      <button
        type="button"
        className="flex w-full items-center justify-center border-y border-slate-300 px-2 py-3 hover:bg-slate-50 active:bg-slate-100"
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-1.5 h-5 w-5 text-slate-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>
        Sign out
      </button>
      <Modal open={isOpen} setOpen={setIsOpen}>
        <div className="">
          <p className="max-w-48">Are you sure you want to sign out?</p>
          <div className="mt-3 flex space-x-2">
            <button
              className="w-full rounded-sm border border-slate-400 py-1 hover:bg-neutral-200"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="w-full rounded-sm border border-red-600 bg-red-600 py-1 text-white hover:bg-red-500"
              onClick={() => logOut()}
            >
              Sign out
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
