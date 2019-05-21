import { Student } from 'src/assets/models/student';

export interface ITab {
  id: string;
  type: string
  name: string;
  unique: boolean;
  studId?: string;
  position?: string;
}