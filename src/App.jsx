import "./app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import InputScreen from "./InputScreen";
import OutputScreen from "./OutputScreen";
import Footer from "./Footer";

const App = () => {
  const [joke, setJoke] = useState("");

  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path="/" element={<InputScreen setJoke={setJoke} />} />
        <Route path="/output" element={<OutputScreen joke={joke} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
