import { TextField, Select } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const SearchBar = ({ handleSearch, searchTerm, setSearchField, options }) => {
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
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        >
          <TextField.Slot side="right">
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </div>
    </div>
  );
};

export default SearchBar;
