import { useStore } from "./store/useStore";
import LoginCard from "./components/LoginCard";
import Dashboard from "./layout/Dashboard";

export default function App() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  return (
    <>
      {!isAuthenticated ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <LoginCard />
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
}
