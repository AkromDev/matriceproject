import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MatriceInput from "./components/MatriceInput";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <MatriceInput />
        <Footer />
      </div>
    );
  }
}

export default App;
