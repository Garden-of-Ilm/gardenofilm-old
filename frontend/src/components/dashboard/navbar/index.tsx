import React, { useState } from "react";
import NavbarStyles from "./navbar.module.css";
import Link from "next/link";
import BarsIcon from "../../../icons/bars.icon";
import Image from "next/image";
import { AddIcons, LinearEditIcon } from "@/icons";
import { useRouter } from "next/router";
import Modal from "@/components/modal";
import { useAuthContext } from "@/guard/AuthContext";

interface Props {
  withMobileLogo: boolean;
  isForm?: boolean;
  buttonText?: string;
  formRef?: React.MutableRefObject<HTMLButtonElement | null>;
  isEdit?: boolean;
}

function Navbar({
  withMobileLogo,
  isForm,
  buttonText = "Create fatwa",
  formRef,
  isEdit,
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const [openLogOut, setOpenLogOut] = useState(false);
  const { query } = useRouter();

  const { logOut } = useAuthContext();

  const handleCreate = () => {
    if (formRef?.current) {
      formRef.current.click();
    }
  };

  const editQuery = isEdit ? `?fatwaId=${query.id}` : "";

  return (
    <>
      <header
        className={
          NavbarStyles.header + `  ${isOpen && NavbarStyles.headerActive}`
        }
      >
        <div className="container flex items-center justify-end">
          <Image src="/logo.png" alt="Fatwa logo" width={56} height={56} />

          <div className="flex items-center gap-[56px]">
            {isForm ? (
              <button
                className={NavbarStyles.header_link}
                type="button"
                onClick={handleCreate}
              >
                {!isEdit ? <AddIcons /> : <LinearEditIcon />}
                <span>{buttonText}</span>
              </button>
            ) : (
              <Link
                href={"/admin/fatwa-create" + editQuery}
                className={NavbarStyles.header_link}
              >
                {!isEdit ? <AddIcons /> : <LinearEditIcon />}
                <span>{buttonText}</span>
              </Link>
            )}
            <button
              type="button"
              className={NavbarStyles.logOut}
              onClick={() => setOpenLogOut(true)}
            >
              Log out
            </button>
          </div>
          <span
            className={NavbarStyles.overlay}
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="container">
          <button type="button" onClick={() => setOpen(true)}>
            <BarsIcon />
          </button>
          <Link
            href={"/"}
            className={
              withMobileLogo
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }
          >
            <Image src="/logo.png" alt="Fatwa logo" width={56} height={56} />
          </Link>
          <span></span>
        </div>
      </header>

      <div className={NavbarStyles.mobileNavbarLink}>
        {isForm ? (
          <button
            className={NavbarStyles.header_link}
            type="button"
            onClick={handleCreate}
          >
            {!isEdit ? <AddIcons /> : <LinearEditIcon />}
            <span>{buttonText}</span>
          </button>
        ) : (
          <Link
            href={`/admin/fatwa-create` + editQuery}
            className={NavbarStyles.header_link}
          >
            {!isEdit ? <AddIcons /> : <LinearEditIcon />}
            <span>{buttonText}</span>
          </Link>
        )}
      </div>
      <Modal open={openLogOut} setOpen={setOpenLogOut}>
        <div className={NavbarStyles.logOutModal}>
          <p>Do you want to Logout?</p>
          <div>
            <button
              className="bg-[#DFDCD9]"
              onClick={() => setOpenLogOut(false)}
            >
              Cancel
            </button>
            <button className="bg-[#F33] text-white" onClick={() => logOut()}>
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Navbar;
