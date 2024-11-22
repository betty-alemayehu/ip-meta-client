import "./app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import InputScreen from "./InputScreen";
import OutputScreen from "./OutputScreen";
import Footer from "./Footer";

const App = () => {
  const [jokeQuery, setJokeQuery] = useState("");

  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path="/" element={<InputScreen setJokeQuery={setJokeQuery} />} />
        <Route
          path="/output"
          element={<OutputScreen jokeQuery={jokeQuery} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
