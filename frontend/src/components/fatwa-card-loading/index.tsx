import React from "react";
import FatwaCardLoadingStyles from "./fatwa-card.module.css";

function FatwaCardLoading() {
  return (
    <div className={FatwaCardLoadingStyles.cardLoader}>
      <div className="h-[100px]">
        <span className="w-[40%] block animate-pulse bg-gray-200 h-[10px]" />
        <span className="w-[60%] block animate-pulse bg-gray-200 mt-[10px] h-[10px]" />
        <span className="w-[80%] block animate-pulse bg-gray-200 mt-[10px] h-[10px]" />
      </div>
      <div className="flex items-center justify-between">
        <span className="w-[40px] animate-pulse h-[5px] bg-gray-200" />
        <span className="w-[40px] animate-pulse h-[5px] bg-gray-200" />
      </div>
    </div>
  );
}

export default FatwaCardLoading;
