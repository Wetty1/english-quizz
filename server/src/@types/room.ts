export interface RoomDetails {
  title: string;
  timeToResponse: number;
  currentQuestion: number;
  status: 'InQuestion' | 'WaitStart' | 'Transition' | 'Finished';
  questions: Questions[];
  listUsers: User[];
}

export interface Rooms {
  [room: string]: RoomDetails;
}

export interface User {
  id: string;
  name: string;
  responses: number[];
}

export interface Questions {
  alternatives: string[];
  correctAlternative: number;
  question: string;
}
