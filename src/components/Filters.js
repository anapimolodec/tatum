import React from "react";
import { CheckboxGroup } from "@radix-ui/themes";

const Filters = ({ title, items, selectedItems, onItemChange }) => {
  return (
    <CheckboxGroup.Root
      className="flex flex-wrap gap-4"
      value={selectedItems}
      onValueChange={onItemChange}
      color="teal"
    >
      <div className="flex gap-10">
        <h4 className="text-sm font-bold text-gray-700">{title}</h4>
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <CheckboxGroup.Item
              value={item}
              className="w-[16px] h-[16px] rounded border border-gray-300 bg-white data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
              id={`${title}-${item}`}
            />
            <label
              className="text-sm text-gray-700"
              htmlFor={`${title}-${item}`}
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </CheckboxGroup.Root>
  );
};

export default Filters;
