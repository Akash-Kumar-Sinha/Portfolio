import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NoRoute from "./utils/NoRoute/NoRoute";
import AdminPanel from "./Components/Admin/AdminPanel";
import AdminSetting from "./Pages/AdminSetting";
import AuthProtect from "./utils/Hooks/AuthProtect";

function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aksadmin" element={<AdminPanel />} />
        <Route path="*" element={<NoRoute />} />
        <Route
          path="/aks_admin_private"
          element={
            <AuthProtect>
              <AdminSetting />
            </AuthProtect>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
