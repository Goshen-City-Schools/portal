import React, { useState } from "react";
import { useAuth } from "../../../app/contexts/AuthContext";
import useStaffLogin from "../../../logic/StaffLoginRequest";

const StaffLoginForm = () => {
  const { login, isLoading, setIsLoading } = useAuth();
  const staffLogin = useStaffLogin(login, isLoading, setIsLoading);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await staffLogin(username, password);
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default StaffLoginForm;
