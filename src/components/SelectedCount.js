import { strings } from "../lib/constants/strings";

const SelectedCount = ({ count }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-teal-700 font-bold">
        {strings.selected}
      </span>
      <span className="inline-flex items-center justify-center w-5 h-5 p-3 border border-solid border-teal-700 text-xs text-teal-700 rounded-full font-bold">
        {count}
      </span>
    </div>
  );
};

export default SelectedCount;
