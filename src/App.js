import { userStore } from "./store/userStore";
import LoginCard from "./components/LoginCard";
import Dashboard from "./layout/Dashboard";

export default function App() {
  const isAuthenticated = userStore((state) => state.isAuthenticated);

  return (
    <>
      {!isAuthenticated ? (
        <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-tr from-green-100 to-teal-700">
          <LoginCard />
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
}
