import React from "react";
import styles from "./data-not-found.module.css";
import { NotFoundIcons } from "@/icons";

interface Props {
  search?: string;
}

function DataNotFound({ search }: Props) {
  return (
    <div className={styles.wrapper}>
      <NotFoundIcons />
      {search && (
        <div className={styles.search}>
          <p>Sorry, no fatwa found for your search</p>
          <span>{search}</span>
        </div>
      )}
    </div>
  );
}

export default DataNotFound;
