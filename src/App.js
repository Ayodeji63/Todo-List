import "./App.css";
import React, { useContext } from "react";
import SignIn from "./pages/SignIn";
import Landing from "./pages/Landing";
import TodoPage from "./pages/TodoPage";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
import { useAuth } from "./Context/AuthContext";
import List from "./pages/List";

function App() {
  const { loading } = useAuth();
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign" element={<SignIn />} />
        <Route path="/get-started" element={<SignUp />} />
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todoPage"
          element={
            <ProtectedRoute>
              <TodoPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      {loading && <Loading />}
    </div>
  );
}

export default App;
