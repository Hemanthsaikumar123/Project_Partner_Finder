import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import ProjectFeed from "./pages/ProjectFeed"
import CreateProject from "./pages/CreateProject"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProjectFeed />} />

        <Route path="/create-project" element={<CreateProject />} />

      </Routes>

    </BrowserRouter>

  )

}

export default App