import React from "react";
import { HashRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;