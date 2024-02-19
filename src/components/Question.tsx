import React, { FC } from "react";
import { IQuestion } from "../App";
import { Action, ActionType, AppStatus } from "../constants/constants";
import ProgressBar from "./ProgressBar";

import Options from "./Options";

interface QuestionProps {
  question: IQuestion;
  dispatch: React.Dispatch<Action>;
  currentQuestionIndex: number;
  numOfQuestions: number;
  score: number;
  status: AppStatus;
  answerIndex: number;
  maxPoints: number;
}

const Question: FC<QuestionProps> = ({
  question,
  dispatch,
  currentQuestionIndex,
  numOfQuestions,
  score,
  status,
  answerIndex,
  maxPoints,
}) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <ProgressBar
        numOfQuestions={numOfQuestions}
        currentQuestionIndex={currentQuestionIndex}
        score={score}
        maxPoints={maxPoints}
      />

      {status === AppStatus.active && (
        <Options
          dispatch={dispatch}
          question={question}
          answerIndex={answerIndex}
        />
      )}

      {answerIndex !== -1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: ActionType.nextQuestion })}
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default Question;
