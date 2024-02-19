import { FC } from "react";
interface FinishScreenProps {
  score: number;
}

const FinishScreen: FC<FinishScreenProps> = ({ score }) => {
  return (
    <div>
      <h3>Your score is {score} </h3>
    </div>
  );
};

export default FinishScreen;
