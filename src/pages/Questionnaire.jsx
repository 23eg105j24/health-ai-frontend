import { useState } from "react";
import { questions } from "../data/questions";

function Questionnaire({ category, goBack, onFinish }) {
  const [answers, setAnswers] = useState({});

  const categoryQuestions = questions[category] || [];

  const handleChange = (question, value) => {
    setAnswers({ ...answers, [question]: value });
  };

  const handleSubmit = () => {
    onFinish({
      category,
      answers
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={goBack}>Back</button>
      <h2>{category}</h2>

      {categoryQuestions.map((q, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <p>{q}</p>
          <input
            type="text"
            onChange={(e) => handleChange(q, e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Questionnaire;