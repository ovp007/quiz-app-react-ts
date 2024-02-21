import { FC, createContext, useEffect, useReducer } from "react";
import { IQuestion } from "../App";
import { Action, ActionType, AppStatus } from "../constants/constants";

export interface QuizContextProps {
  status: AppStatus;
  questions: IQuestion[];
  currentQuestionIndex: number;
  answerIndex: number;
  score: number;
  numOfQuestions: number;
  maxPoints: number;
  dispatch: React.Dispatch<Action>;
}
interface QuizContextProviderProps {
  children: React.ReactNode;
}

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

export const QuizContext = createContext<QuizContextProps | null>(null);

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

const QuizContextProvider: FC<QuizContextProviderProps> = ({ children }) => {
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
    <QuizContext.Provider
      value={{
        dispatch,
        status,
        score,
        questions,
        currentQuestionIndex,
        answerIndex,
        numOfQuestions,
        maxPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContextProvider };
