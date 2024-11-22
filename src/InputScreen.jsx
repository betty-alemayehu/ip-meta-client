import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InputScreen.scss";

const InputScreen = ({ setJoke }) => {
  const navigate = useNavigate();

  // Dropdown options
  const hobbies = [
    "Sports & Fitness",
    "Arts & Crafts",
    "Technology & Gaming",
    "Travel & Adventure",
    "Cooking & Food",
  ];
  const ages = ["18-25", "26-35", "36-45", "46-60", "60+"];
  const moods = ["Happy", "Relaxed", "Energetic", "Stressed", "Reflective"];
  const humorTypes = [
    "Sarcastic",
    "Wholesome",
    "Pun-based",
    "Witty/Intellectual",
    "Slapstick",
  ];

  // State for form inputs
  const [formData, setFormData] = useState({
    hobby: "",
    age: "",
    mood: "",
    humorType: "",
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Match joke based on formData (mock logic)
    import("./jokes").then(({ jokes }) => {
      const selectedJoke = jokes.find(
        (j) =>
          j.hobby === formData.hobby &&
          j.age === formData.age &&
          j.mood === formData.mood &&
          j.type === formData.humorType
      );
      setJoke(selectedJoke?.joke || "No jokes available for this combination!");
      navigate("/output");
    });
  };

  return (
    <div className="input-screen">
      <h1>Just for Laughs</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Favorite Hobby:
          <select
            value={formData.hobby}
            onChange={(e) =>
              setFormData({ ...formData, hobby: e.target.value })
            }
            required
          >
            <option value="">Select</option>
            {hobbies.map((hobby) => (
              <option key={hobby} value={hobby}>
                {hobby}
              </option>
            ))}
          </select>
        </label>
        <label>
          Age:
          <select
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
          >
            <option value="">Select</option>
            {ages.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </label>
        <label>
          Mood:
          <select
            value={formData.mood}
            onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
            required
          >
            <option value="">Select</option>
            {moods.map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </label>
        <label>
          Type of Humor:
          <select
            value={formData.humorType}
            onChange={(e) =>
              setFormData({ ...formData, humorType: e.target.value })
            }
            required
          >
            <option value="">Select</option>
            {humorTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Generate Joke</button>
      </form>
    </div>
  );
};

export default InputScreen;
