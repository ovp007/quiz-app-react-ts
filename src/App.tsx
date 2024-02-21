import { FC } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import { AppStatus } from "./constants/constants";
import Question from "./components/Question";
import FinishScreen from "./components/FinishScreen";
import Main from "./components/Main";
import Error from "./components/Error";
import { useQuiz } from "./context/useQuiz";

export interface IQuestion {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

const App: FC = () => {
  const { status, questions, currentQuestionIndex, answerIndex } = useQuiz();

  return (
    <Main>
      <Header />
      {status === AppStatus.loading && <Loader />}
      {status === AppStatus.error && <Error />}
      {status === AppStatus.ready && <StartScreen />}
      {status === AppStatus.active && (
        <Question
          question={questions[currentQuestionIndex]}
          answerIndex={answerIndex}
        />
      )}
      {status === AppStatus.finish && <FinishScreen />}
    </Main>
  );
};

export default App;
