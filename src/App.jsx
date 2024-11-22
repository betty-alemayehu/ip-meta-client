import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputScreen from "./InputScreen";
import OutputScreen from "./OutputScreen";

const App = () => {
  const [joke, setJoke] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputScreen setJoke={setJoke} />} />
        <Route path="/output" element={<OutputScreen joke={joke} />} />
      </Routes>
    </Router>
  );
};

export default App;
