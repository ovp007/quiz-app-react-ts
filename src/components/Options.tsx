import { FC } from "react";
import { ActionType } from "../constants/constants";
import { IQuestion } from "../App";
import { useQuiz } from "../context/useQuiz";
interface OptionProps {
  question: IQuestion;
  answerIndex: number;
}

const Options: FC<OptionProps> = ({ question, answerIndex }) => {
  const hasAnswered = answerIndex !== -1;
  const { dispatch } = useQuiz();
  return (
    <div className="options">
      {question.options?.map((option, index) => (
        <button
          key={option}
          value={index}
          disabled={hasAnswered}
          className={`btn btn-option ${answerIndex === index ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: ActionType.answer, payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
