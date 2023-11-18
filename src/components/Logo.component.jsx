import React from "react";

export default function Logo() {
  return (
    <div className="flex relative h-16 w-16 ">
      <img
        src={"/new-logo.png"}
        alt="Goshen Logo with Name"
        height={180}
        width={180}
        loading="eager"
        className=" left-0 object-contain h-full w-full"
      />
    </div>
  );
}
