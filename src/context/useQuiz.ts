import { useContext } from "react";
import { QuizContext } from "./QuizContext";

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === null || undefined)
    throw new Error("Context outside provider");
  return context;
};

export { useQuiz };
