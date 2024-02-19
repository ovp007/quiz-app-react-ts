import { IQuestion } from "../App";

export enum ActionType {
  "loading",
  "dataLoaded",
  "error",
  "start",
  "answer",
  "nextQuestion",
}

export enum AppStatus {
  "loading",
  "error",
  "ready",
  "active",
  "finish",
}

export type Action =
  | { type: ActionType.loading }
  | { type: ActionType.dataLoaded; payload: IQuestion[] } // Adjust the payload type according to the structure of your questions
  | { type: ActionType.error }
  | { type: ActionType.start }
  | { type: ActionType.answer; payload: number }
  | { type: ActionType.nextQuestion };
