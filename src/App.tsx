import { Route, Routes } from "react-router-dom"
import { SignIn2 } from "./pages/login"

export function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn2 />} />
      <Route path="/sign-up" element={<div>Sign Up</div>} />
      <Route path="/dashboard" element={<div>Dashboard</div>} />
    </Routes>
  )
}

export default App
