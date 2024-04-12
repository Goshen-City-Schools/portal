import React, { useState } from "react";
import useStudentLogin from "../../../logic/StudentLoginRequest";
import { useAuth } from "../../../app/contexts/AuthContext";

const StudentLoginForm = () => {
  const { login, isLoading, setIsLoading } = useAuth();
  const studentLogin = useStudentLogin(login, isLoading, setIsLoading);
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await studentLogin(studentId, password);
  };

  return (
    <div>
      <input
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="Student ID"
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

export default StudentLoginForm;
