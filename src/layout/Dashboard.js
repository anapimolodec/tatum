import React from "react";
import Sidebar from "../components/SideBar";
import { userStore } from "../store/userStore";
import { navStore } from "../store/navStore";
import Header from "../components/Header";
import UsersPage from "./UsersPage";
import TasksPage from "./TasksPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { strings } from "../constants/strings";

const queryClient = new QueryClient();

const Dashboard = () => {
  const user = userStore((state) => state.user);
  const currentPage = navStore((state) => state.currentPage);

  const renderContent = () => {
    switch (currentPage) {
      case "users":
        return <UsersPage />;
      case "tasks":
        return <TasksPage />;
      default:
        return <p>{strings.something_is_wrong}</p>;
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <aside>
        <Sidebar />
      </aside>
      <main className="flex-1 p-6 ">
        <Header user={user} currentPage={currentPage} />
        <QueryClientProvider client={queryClient}>
          {renderContent()}
        </QueryClientProvider>
      </main>
    </div>
  );
};

export default Dashboard;
