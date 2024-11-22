import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InputScreen.scss";

const InputScreen = ({ setJokeQuery }) => {
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

  // State for form errors
  const [errors, setErrors] = useState({});

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.hobby) newErrors.hobby = "Please select a hobby.";
    if (!formData.age || !ages.includes(formData.age))
      newErrors.age = "Please select a valid age group.";
    if (!formData.mood) newErrors.mood = "Please select a mood.";
    if (!formData.humorType)
      newErrors.humorType = "Please select a type of humor.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setJokeQuery(formData);
      navigate("/output");
    }
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
          {errors.hobby && <span className="error">{errors.hobby}</span>}
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
          {errors.age && <span className="error">{errors.age}</span>}
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
          {errors.mood && <span className="error">{errors.mood}</span>}
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
          {errors.humorType && (
            <span className="error">{errors.humorType}</span>
          )}
        </label>
        <button type="submit">Generate Joke</button>
      </form>
    </div>
  );
};

export default InputScreen;
