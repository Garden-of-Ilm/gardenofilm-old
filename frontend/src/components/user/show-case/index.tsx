import React, { FormEvent } from "react";
import Image from "next/image";

import ShowCaseStyles from "./show-case.module.css";
import { SearchIcon } from "@/icons";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

interface Props {
  is_heading: boolean;
}

const GoldenSearchIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.8368 10.3748L9.49991 8.03828C9.39444 7.93282 9.25146 7.87423 9.10145 7.87423H8.71939C9.36631 7.04697 9.75071 6.00644 9.75071 4.87452C9.75071 2.18182 7.56852 0 4.87536 0C2.18219 0 0 2.18182 0 4.87452C0 7.56723 2.18219 9.74905 4.87536 9.74905C6.00747 9.74905 7.04817 9.36471 7.87558 8.7179V9.09989C7.87558 9.24988 7.93417 9.39283 8.03965 9.49829L10.3765 11.8348C10.5969 12.0551 10.9531 12.0551 11.1711 11.8348L11.8345 11.1716C12.0548 10.9513 12.0548 10.5951 11.8368 10.3748ZM4.87536 7.87423C3.2182 7.87423 1.87514 6.53374 1.87514 4.87452C1.87514 3.21765 3.21586 1.87482 4.87536 1.87482C6.53251 1.87482 7.87558 3.21531 7.87558 4.87452C7.87558 6.53139 6.53485 7.87423 4.87536 7.87423Z"
      fill="url(#paint0_linear_338_4118)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_338_4118"
        x1="-4.21181e-08"
        y1="5.87501"
        x2="11.7439"
        y2="5.87501"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D79F26" />
        <stop offset="1" stopColor="#D6C427" />
      </linearGradient>
    </defs>
  </svg>
);

function ShowCase({ is_heading }: Props) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { push, pathname } = useRouter();

  function handleSearch(term: string) {
    term ? params.set("search", term) : params.delete("search");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    push(`/?${params.toString()}`);
  }

  return (
    <div className={ShowCaseStyles.showcase + " show-case"}>
      <div className="container">
        <div
          className={ShowCaseStyles.content}
          style={{
            height: is_heading ? "383px" : "200px",
            paddingBottom: is_heading ? "41px" : "",
          }}
        >
          {is_heading && (
            <>
              <Image
                src="/logo.png"
                alt="Fatwa logo"
                width={100}
                height={100}
                style={{
                  marginTop: "16px",
                }}
              />
              <h1 className={ShowCaseStyles.title}>Islamic Rulings</h1>
              <p className={ShowCaseStyles.description}>
                Upon the understanding of Islam practiced by the companions of
                the Messenger of Allah <span>ﷺ</span>
              </p>
            </>
          )}
          <div
            className={
              ShowCaseStyles.searchContainer +
              ` ${is_heading && ShowCaseStyles.searchAbsolute}`
            }
          >
            <form onSubmit={handleSubmit}>
              <div>
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search for a fatwa"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                  defaultValue={searchParams.get("search")?.toString()}
                />
              </div>
              <button type="submit">
                <span>Search</span>
                <GoldenSearchIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCase;
