import { NoteType } from "./NoteTypes";

export interface TodoType {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  created_at: string;
}

export interface TodoDetailType {
  id: number;
  title: string;
  content: string;
  created_at: string;
  completed: boolean;
  notes: NoteType[];
}