import React from "react";

export default function TileComponent({ data, selected = [], onClick }) {
   return data && data.length ? (
      <div className="mt-3 flex flex-wrap items-center gap-1">
         {data.map((dataItem) => (
            <label
               onClick={() => onClick(dataItem)}
               key={dataItem.id}
               className={`cursor-pointer${
                  selected &&
                  selected.length &&
                  selected.map((item) => item.id).indexOf(dataItem.id) !== -1
                     ? "bg-black"
                     : ""
               }`}
            >
               <span
                  className={`border-black border-1 rounded-lg  px-4 py-2 font-bold${
                     selected &&
                     selected.length &&
                     selected.map((item) => item.id).indexOf(dataItem.id) !== -1
                        ? "text-white"
                        : ""
                  }`}
               >
                  {dataItem.label}
               </span>
            </label>
         ))}
      </div>
   ) : null;
}
