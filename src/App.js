import React, { useState, useEffect } from "react";
import "./assets/scss/App.scss";
import Header from "./components/header/Header";

function App() {
  const [wordToSearch, setSwordToSearch] = useState("bridge");
  const [isMobile, toggleIsMobile] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault()

    console.log(e.target.value)
  }

  return (
    <div className='App' id={isMobile ? "no-scroll" : ""}>
      <Header
        isMobile={isMobile}
        toggleIsMobile={toggleIsMobile}
        wordToSearch={wordToSearch}
        handleSearch={handleSearch}
      />
    </div>
  );
}

export default App;
