import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  return (
    <div className="flex h-full flex-1 app-root bg-white">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default App;
