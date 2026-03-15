import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import ProjectFeed from "./pages/ProjectFeed"
import CreateProject from "./pages/CreateProject"
import ProjectDetails from "./pages/ProjectDetails"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import MyProjects from "./pages/MyProjects"
import MyApplications from "./pages/MyApplications"
import Profile from "./pages/Profile"

function App() {

  return (

    <BrowserRouter>

      <Navbar />
      <Routes>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProjectFeed />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-project"
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-projects"
          element={
            <ProtectedRoute>
              <MyProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
            }
          />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>

    </BrowserRouter>

  )

}

export default App