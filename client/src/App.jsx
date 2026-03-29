import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./admin/Dashboard";


function App() {
  return (
    <Router>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Dashboard />}/>

        {/* Protected Admin Panel */}
        <Route
  path="/admin/dashboard"
  element={<Dashboard />}

        />

      </Routes>
    </Router>
  );
}

export default App;