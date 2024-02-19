import { FC } from "react";
import { Action, ActionType } from "../constants/constants";

interface StartScreenProps {
  dispatch: React.Dispatch<Action>;
  numOfQuestions: number;
}

const StartScreen: FC<StartScreenProps> = ({ dispatch, numOfQuestions }) => {
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
