import { useStore } from "./store/useStore";
import LoginCard from "./components/LoginCard";
import { Button } from "@radix-ui/themes";

export default function App() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  return (
    <>
      {!isAuthenticated ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <LoginCard />
        </div>
      ) : (
        <>
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Task Management</h1>
              <p className="text-gray-600">Welcome, {user.userName}</p>
            </div>
            <Button onClick={logout}>Logout</Button>
          </header>
        </>
      )}
    </>
  );
}
