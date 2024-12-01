import React from "react";
import { IconButton, DropdownMenu } from "@radix-ui/themes";
import { PersonIcon, ChevronDownIcon, ExitIcon } from "@radix-ui/react-icons";
import { userStore } from "@/lib/store/userStore";
import { strings } from "@/lib/constants/strings";
import { usePathname } from "next/navigation";
const Header = () => {
  const pathname = usePathname();

  const { user, logout } = userStore();
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex justify-between items-center">
      <h1 className="text-2xl font-bold mb-4">
        {pathname === "/dashboard/tasks"
          ? strings.task_list
          : strings.user_list}
      </h1>
      <div className="flex gap-2 items-center text-blue-600 font-bold text-sm">
        <span>{user.userName}</span>
        <span>{user.userRole}</span>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton variant="ghost" className="cursor-pointer">
              <ChevronDownIcon />
            </IconButton>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content>
            <DropdownMenu.Item
              className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer"
              onClick={handleLogout}
            >
              <ExitIcon className="w-4 h-4 hover:color-white" />
              {strings.logout}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <PersonIcon className="ml-4" />
      </div>
    </nav>
  );
};

export default Header;
