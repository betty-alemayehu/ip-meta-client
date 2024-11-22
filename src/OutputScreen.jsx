import { useNavigate } from "react-router-dom";
import "./OutputScreen.scss";

const OutputScreen = ({ joke }) => {
  const navigate = useNavigate();

  return (
    <div className="output-screen">
      <h1>Your Personalized Joke:</h1>
      <p>{joke}</p>
      <button onClick={() => navigate("/")}>Get Another Joke</button>
    </div>
  );
};

export default OutputScreen;
