import React, { useState } from "react";

import { Header } from "./components/Header";
import { CarList } from "./components/CarList";

import { ThemeProvider } from "@chakra-ui/core";
import customTheme from "./theme/customTheme";
import "./App.css";

function App() {
  const [status, setStatus] = useState(false);

  const statusHelper = () => {
    setStatus(!status);
  };
  return (
    <ThemeProvider theme={customTheme}>
      <div className="App">
        <Header statusHelper={statusHelper} />
        <CarList status={status} />
      </div>
    </ThemeProvider>
  );
}

export default App;
