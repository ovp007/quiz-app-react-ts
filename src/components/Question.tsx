import { FC } from "react";
import { IQuestion } from "../App";
import { ActionType, AppStatus } from "../constants/constants";
import ProgressBar from "./ProgressBar";

import Options from "./Options";
import { useQuiz } from "../context/useQuiz";

interface QuestionProps {
  question: IQuestion;
  answerIndex: number;
}

const Question: FC<QuestionProps> = ({ question, answerIndex }) => {
  const { status, dispatch } = useQuiz();
  return (
    <div>
      <h4>{question.question}</h4>
      <ProgressBar />

      {status === AppStatus.active && (
        <Options question={question} answerIndex={answerIndex} />
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
