import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MainContent, Navbar, Footer } from "./components/layout";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <MainContent />
        <Footer />
      </div>
    );
  }
}

export default App;
