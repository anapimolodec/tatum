import React from "react";
import Sidebar from "../components/SideBar";
import { useStore } from "../store/useStore";
import { navStore } from "../store/navStore";
import Header from "../components/Header";
import UsersPage from "./UsersPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TasksPage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Tasks</h1>
    {/* Your tasks page content */}
  </div>
);

const Dashboard = () => {
  const user = useStore((state) => state.user);
  const currentPage = navStore((state) => state.currentPage);
  const queryClient = new QueryClient();

  const renderContent = () => {
    switch (currentPage) {
      case "users":
        return <UsersPage />;
      case "tasks":
        return <TasksPage />;
      default:
        return <p>Something is wrong</p>;
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
