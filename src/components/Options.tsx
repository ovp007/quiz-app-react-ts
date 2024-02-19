import React, { FC } from "react";
import { Action, ActionType } from "../constants/constants";
import { IQuestion } from "../App";
interface OptionProps {
  dispatch: React.Dispatch<Action>;
  question: IQuestion;
  answerIndex: number;
}

const Options: FC<OptionProps> = ({ dispatch, question, answerIndex }) => {
  const hasAnswered = answerIndex !== -1;
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
