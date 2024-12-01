import { TextField, Select } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import CreateTaskDialog from "./Tasks/CreateTaskDialog";
import { strings } from "../lib/constants/strings";

const SearchBar = ({
  handleSearch,
  searchTerm,
  setSearchField,
  options,
  showButton,
  onTaskCreated,
}) => {
  return (
    <div className="flex gap-1">
      <Select.Root defaultValue={options[0].id} onValueChange={setSearchField}>
        <Select.Trigger />
        <Select.Content color="teal">
          {options.map((option) => (
            <Select.Item key={option.id} value={option.id}>
              {option.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <div className="w-72">
        <TextField.Root
          placeholder={strings.search_dots}
          value={searchTerm}
          onChange={handleSearch}
        >
          <TextField.Slot side="right">
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </div>
      {showButton && <CreateTaskDialog onTaskCreated={onTaskCreated} />}
    </div>
  );
};

export default SearchBar;
