import { FC } from "react";
import { useQuiz } from "../context/useQuiz";
interface FinishScreenProps {}

const FinishScreen: FC<FinishScreenProps> = () => {
  const { score } = useQuiz();
  return (
    <div>
      <h3>Your score is {score} </h3>
    </div>
  );
};

export default FinishScreen;
