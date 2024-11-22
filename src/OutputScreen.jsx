import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OutputScreen.scss";

const OutputScreen = ({ jokeQuery }) => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null); // Holds the final image URL
  const [loading, setLoading] = useState(true); // Tracks the loading state
  const [feedback, setFeedback] = useState(null); // Tracks user feedback (thumbs-up or thumbs-down)
  const [joke, setJoke] = useState("");

  const genericJoke =
    "Why don’t skeletons fight each other? They don’t have the guts!";
  const backendURL = import.meta.env.VITE_API_URL;

  // Function to generate an image using OpenAI API
  const generateAIImage = async (prompt) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      console.error("API Key is missing or undefined");
      return "https://via.placeholder.com/1024?text=API+Key+Missing";
    }

    const validPrompt = prompt || "A scenic view illustration.";
    console.log(prompt);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          model: "dall-e-3",
          prompt: validPrompt,
          n: 1,
          size: "1024x1024",
          response_format: "url",
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data[0].url;
    } catch (error) {
      console.error(
        "Error generating image:",
        error.response?.data || error.message
      );
      return "https://via.placeholder.com/1024?text=Image+Generation+Error";
    }
  };

  useEffect(() => {
    if (!jokeQuery || !backendURL) {
      return;
    }

    const fetchJoke = async () => {
      const queryString = new URLSearchParams({
        age: jokeQuery.age,
        humor: jokeQuery.humorType,
        hobby: jokeQuery.hobby,
        mood: jokeQuery.mood,
      }).toString();

      const fetchImage = async (joke) => {
        setLoading(true); // Start loading
        const imageUrl = await generateAIImage(joke);
        setImageSrc(imageUrl); // Set the final image URL
        setLoading(false); // Stop loading
      };

      try {
        const { data } = await axios.get(`${backendURL}/jokes?${queryString}`);
        if (data) {
          const joke_text = data?.joke_text ?? genericJoke;
          setJoke(joke_text);
          fetchImage(joke_text);
        }
      } catch (e) {
        setJoke(genericJoke);
        fetchImage(genericJoke);
      }
    };

    fetchJoke();
  }, [jokeQuery, backendURL]);

  const handleFeedback = (type) => {
    setFeedback(type);
    console.log(`User feedback: ${type}`); // Optional: Send feedback to the server for optimization
  };

  return (
    <div className="output-screen">
      <h1>Your Personalized Joke:</h1>
      <p aria-live="polite">{joke}</p>

      {/* Conditional Rendering: Show only one image */}
      {loading ? (
        <img
          src="https://cdn.dribbble.com/users/2060702/screenshots/14901627/media/4ba5b465f673a74497f09218e8c998ad.gif"
          alt="Loading animation"
        />
      ) : (
        <img src={imageSrc} alt="AI-generated illustration" />
      )}

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

      <button onClick={() => navigate("/")}>Get Another Joke</button>
    </div>
  );
};

export default OutputScreen;
