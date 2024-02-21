import { FC } from "react";
import { ActionType } from "../constants/constants";
import { useQuiz } from "../context/useQuiz";

const StartScreen: FC = () => {
  const { dispatch, numOfQuestions } = useQuiz();

  return (
    <div className="start">
      <h2> Welcome to react quiz</h2>
      <h3>{numOfQuestions} questions about React</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ActionType.start })}
      >
        Lets start
      </button>
    </div>
  );
};

export default StartScreen;
