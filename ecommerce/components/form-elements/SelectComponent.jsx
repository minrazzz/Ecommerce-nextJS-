export default function SelectComponent({
   label,
   value,
   onChange,
   options = [],
}) {
   return (
      <>
         <div className="relative">
            <p className="pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600">
               {label}
            </p>
            <select
               value={value}
               onChange={onChange}
               className="border placeholder-gray-400 focus:outline-none focus:border-black w-ful p-4 mr-0 mt-0 ml-0 text-base bg-white border-gray-300"
            >
               {options && options.length ? (
                  options.map((optionItem) => (
                     <options
                        id={optionItem.id}
                        value={optionItem.id}
                        key={optionItem.id}
                     >
                        {optionItem}
                     </options>
                  ))
               ) : (
                  <options value={""}>Select</options>
               )}
            </select>
         </div>
      </>
   );
}
