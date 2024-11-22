import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OutputScreen.scss";
import axios from "axios";

const OutputScreen = ({ jokeQuery }) => {
  const navigate = useNavigate();
  const [joke, setJoke] = useState("");
  const genericJoke =
    "Why don’t skeletons fight each other? They don’t have the guts!";
  const backendURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!jokeQuery || !backendURL) {
      setJoke(genericJoke);
    }

    const fetchJoke = async () => {
      const queryString = new URLSearchParams({
        age: jokeQuery.age,
        humor: jokeQuery.humorType,
        hobby: jokeQuery.hobby,
        mood: jokeQuery.mood,
      }).toString();

      try {
        const { data } = await axios.get(`${backendURL}/jokes?${queryString}`);
        if (data) {
          const joke_text = data?.joke_text ?? genericJoke;
          setJoke(joke_text);
        }
      } catch (e) {
        setJoke(genericJoke);
      }
    };

    fetchJoke();
  }, [jokeQuery, backendURL]);

  const [feedback, setFeedback] = useState(null);

  const handleFeedback = (type) => {
    setFeedback(type);
    console.log(`User feedback: ${type}`); // should we send feecback to server? to optimize joke selction for better results?
  };

  return (
    <div className="output-screen">
      <h1>Your Personalized Joke:</h1>
      <p aria-live="polite">{joke}</p>

      <div className="feedback-buttons">
        <button
          onClick={() => handleFeedback("thumbs-up")}
          className={`feedback-button ${
            feedback === "thumbs-up" ? "active" : ""
          }`}
          aria-label="Thumbs up"
        >
          👍
        </button>
        <button
          onClick={() => handleFeedback("thumbs-down")}
          className={`feedback-button ${
            feedback === "thumbs-down" ? "active" : ""
          }`}
          aria-label="Thumbs down"
        >
          👎
        </button>
      </div>

      {feedback && (
        <p className="feedback-message">
          {feedback === "thumbs-up"
            ? "Glad you liked it! 🎉"
            : "We'll try to do better next time! 😢"}
        </p>
      )}

      <button className="feedback-jokebutton" onClick={() => navigate("/")}>Get Another Joke</button>
    </div>
  );
};

export default OutputScreen;
