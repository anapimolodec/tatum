import { Table, TextField, Select } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { capitalize } from "../constants/functions";

const SearchBar = ({ options, setSearchTerm, searchTerm }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <Select.Root defaultValue={options[0]}>
          <Select.Trigger className="w-[140px]" />
          <Select.Content>
            <Select.Group>
              {options.map((option) => (
                <Select.Item value={option}>{capitalize(option)}</Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>

        <TextField.Root
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </div>
    </div>
  );
};

export default SearchBar;
