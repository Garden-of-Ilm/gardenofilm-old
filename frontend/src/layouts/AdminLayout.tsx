import React from "react";
import { Navbar, ShowCase } from "@/components/dashboard";

interface Props {
  children: React.ReactNode;
  is_heading?: boolean;
  formRef?: React.MutableRefObject<HTMLButtonElement | null>;
  is_showcase: boolean;
  withMobileLogo: boolean;
  title?: string;
  description?: string;
  search: boolean;
  isForm?: boolean;
  isEdit?: boolean;
  buttonText?: string;
}

export default function AdminLayout(props: Props) {
  const {
    children,
    withMobileLogo,
    is_heading = false,
    is_showcase = false,
    title,
    description,
    search,
    isForm = false,
    buttonText,
    formRef,
    isEdit,
  } = props;
  return (
    <>
      <Navbar
        formRef={formRef}
        withMobileLogo={withMobileLogo}
        isForm={isForm}
        buttonText={buttonText}
        isEdit={isEdit}
      />
      {is_showcase && (
        <ShowCase
          is_heading={is_heading}
          title={title}
          description={description}
          search={search}
        />
      )}
      <div className="admin-container-wrapper">{children}</div>
    </>
  );
}
