import { FC, useEffect, useReducer } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import { Action, ActionType, AppStatus } from "./constants/constants";
import Question from "./components/Question";
import FinishScreen from "./components/FinishScreen";
import Main from "./components/Main";
import Error from "./components/Error";

export interface IQuestion {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

// An interface for our state
interface State {
  status: AppStatus;
  questions: IQuestion[];
  currentQuestionIndex: number;
  answerIndex: number;
  score: number;
}

const intialValues: State = {
  status: AppStatus.loading,
  questions: [],
  currentQuestionIndex: 0,
  answerIndex: -1,
  score: 0,
};

// An interface for our state

function reducer(state: State, action: Action): State {
  const { score, questions, currentQuestionIndex } = state;
  switch (action.type) {
    case ActionType.dataLoaded:
      return {
        ...state,
        status: AppStatus.ready,
        questions: action.payload,
      };
    case ActionType.start:
      return {
        ...state,
        status: AppStatus.active,
      };

    case ActionType.answer: {
      const question = questions[currentQuestionIndex];
      return {
        ...state,
        answerIndex: action.payload,
        score:
          question.correctOption === action.payload
            ? score + question.points
            : score,
      };
    }
    case ActionType.nextQuestion: {
      return {
        ...state,
        currentQuestionIndex: currentQuestionIndex + 1,
        answerIndex: -1,
        status:
          currentQuestionIndex + 1 < questions.length
            ? AppStatus.active
            : AppStatus.finish,
      };
    }
    default:
      return state;
  }
}

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, intialValues);

  const { status, score, questions, currentQuestionIndex, answerIndex } = state;

  const numOfQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    const fetchQuestions = async () => {
      dispatch({ type: ActionType.loading });
      try {
        const response = await fetch("http://localhost:4000/questions");
        if (!response.ok) {
          dispatch({ type: ActionType.error });
        }
        const data = await response.json();
        dispatch({ type: ActionType.dataLoaded, payload: data });
      } catch (error) {
        dispatch({ type: ActionType.error });
        console.error("Error fetching data:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <Main>
      <Header />
      {state.status === AppStatus.loading && <Loader />}
      {state.status === AppStatus.error && <Error />}
      {state.status === AppStatus.ready && (
        <StartScreen dispatch={dispatch} numOfQuestions={numOfQuestions} />
      )}
      {state.status === AppStatus.active && (
        <Question
          currentQuestionIndex={currentQuestionIndex}
          question={questions[currentQuestionIndex]}
          dispatch={dispatch}
          numOfQuestions={numOfQuestions}
          score={score}
          status={status}
          answerIndex={answerIndex}
          maxPoints={maxPoints}
        />
      )}
      {state.status === AppStatus.finish && <FinishScreen score={score} />}
    </Main>
  );
};

export default App;
