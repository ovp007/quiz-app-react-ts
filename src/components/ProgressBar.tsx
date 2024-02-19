import { FC } from "react";

interface ProgressBarProps {
  numOfQuestions: number;
  currentQuestionIndex: number;
  score: number;
  maxPoints: number;
}

const ProgressBar: FC<ProgressBarProps> = ({
  numOfQuestions,
  currentQuestionIndex,
  score,
  maxPoints,
}) => {
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
