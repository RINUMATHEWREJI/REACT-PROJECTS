import { useState } from "react";

import questions from "./Questions";

function Quiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e, index) => {
    setAnswers({ ...answers, [index]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].answer) {
        score++;
      }
    }
    return score;
  };
  const handleRestart = ()=>{
    setSubmitted(false);
    setAnswers({});
  };

  if (submitted) {
    return (
      <div>
        <h2>Quiz Result</h2>
        <p className="result">
          Result: {getScore()}/{questions.length}
        </p>
        {questions.map((q, index) => (
          <div key={index}>
            <h4>{q.question}</h4>
            <p className={answers[index] === q.answer ? "correct" : "wrong"}>
              Your answer: {answers[index]} —
              {answers[index] === q.answer
                ? "✅ Correct"
                : `❌ Wrong (Correct: ${q.answer})`}
            </p>
          </div>
        ))}
        <button onClick={handleRestart} className="restart-btn">Restart</button>
      </div>
    );
  }
  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div key={index}>
              <h3>{q.question}</h3>
              {q.option.map((opt) => (
                <div className="option-container" key={`${index}-${opt}`}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={opt}
                    checked={answers[index] === opt}
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                    required
                  />
                  {opt}
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
      {/* <div className="result-container">
        {submitted && <div>
            <h3>Score :{getScore()}/{questions.length}</h3>
            </div>}
      </div> */}
    </>
  );
}

export default Quiz;
