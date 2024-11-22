import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OutputScreen.scss";

const OutputScreen = ({ joke }) => {
  const navigate = useNavigate();

  const genericJoke = "Why don’t skeletons fight each other? They don’t have the guts!";


  const [feedback, setFeedback] = useState(null);

  const handleFeedback = (type) => {
    setFeedback(type);
    console.log(`User feedback: ${type}`); // should we send feecback to server? to optimize joke selction for better results?
  };

  return (
    <div className="output-screen">
      <h1>Your Personalized Joke:</h1>
      <p aria-live="polite">{joke || genericJoke}</p>
      
      <div className="feedback-buttons">
        <button
          onClick={() => handleFeedback("thumbs-up")}
          className={`feedback-button ${feedback === "thumbs-up" ? "active" : ""}`}
          aria-label="Thumbs up"
        >
          👍
        </button>
        <button
          onClick={() => handleFeedback("thumbs-down")}
          className={`feedback-button ${feedback === "thumbs-down" ? "active" : ""}`}
          aria-label="Thumbs down"
        >
          👎
        </button>
      </div>
      
      {feedback && (
        <p className="feedback-message">
          {feedback === "thumbs-up" ? "Glad you liked it! 🎉" : "We'll try to do better next time! 😢"}
        </p>
      )}

      <button className="feedback-jokebutton" onClick={() => navigate("/")}>Get Another Joke</button>
    </div>
  );
};

export default OutputScreen;
