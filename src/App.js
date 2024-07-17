import React from "react";
import "./App.css";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyList from "./pages/CompanyList";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AddCompany from "./pages/AddCompany";

const App = () => {
  return (
    <Router>
      <div className="app_container">
        <div className="side_nav">
          <Link to="/" className="link">Company List</Link>
          <Link to="/addCompany" className="link">New Company</Link>
        </div>
        <div className="main_content">
          <Routes>
            <Route exact path="/" element={<CompanyList />} />
            <Route exact path="/addCompany" element={<AddCompany />} />
          </Routes>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
};

export default App;
