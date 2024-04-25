
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./pages/Auth"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth/>}>
        <Route index Element/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
