import { FC } from "react";
import { useQuiz } from "../context/useQuiz";

const ProgressBar: FC = () => {
  const { numOfQuestions, score, currentQuestionIndex, maxPoints } = useQuiz();
  return (
    <header className="progress">
      <progress value={currentQuestionIndex + 1} max={numOfQuestions} />
      <p>
        {currentQuestionIndex + 1} / {numOfQuestions}
      </p>
      <p>
        {score} / {maxPoints}
      </p>
    </header>
  );
};

export default ProgressBar;
