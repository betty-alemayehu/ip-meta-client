import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OutputScreen.scss";

const OutputScreen = ({ joke }) => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null); // Holds the final image URL
  const [loading, setLoading] = useState(true); // Tracks the loading state

  // Function to generate an image using OpenAI API
  const generateAIImage = async (prompt) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      console.error("API Key is missing or undefined");
      return "https://via.placeholder.com/1024?text=API+Key+Missing";
    }

    const validPrompt = prompt || "A scenic view illustration.";

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
    const fetchImage = async () => {
      setLoading(true); // Start loading
      const imageUrl = await generateAIImage(joke);
      setImageSrc(imageUrl); // Set the final image URL
      setLoading(false); // Stop loading
    };

    fetchImage();
  }, [joke]);

  return (
    <div className="output-screen">
      <h1>Your Personalized Joke:</h1>
      <p>{joke}</p>

      {/* Conditional Rendering: Show only one image */}
      {loading ? (
        <img
          src="https://cdn.dribbble.com/users/2060702/screenshots/14901627/media/4ba5b465f673a74497f09218e8c998ad.gif"
          alt="Loading animation"
        />
      ) : (
        <img src={imageSrc} alt="AI-generated illustration" />
      )}

      <button onClick={() => navigate("/")}>Get Another Joke</button>
    </div>
  );
};

export default OutputScreen;
