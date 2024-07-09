import { ITour } from './tour';

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface LoginForm {
  authenticationCode: string;
}

export interface SendCodeForm {
  email: string;
}

export interface LoginWithoutAuthForm {
  email: string;
}

export interface UserDepartament {
  id: string;
  name: string;
  createdAt?: string;
  status: string;
}
export interface UserArea {
  id?: string;
  name?: string;
  color?: string;
  createdAt?: string;
  status?: string;
}

export interface User {
  area: UserArea;
  areaId: string;
  authenticationCode: string;
  createdAt: string;
  departament?: UserDepartament;
  departamentId: string;
  email: string;
  id: string;
  isAdmin: boolean;
  isManager: boolean;
  haveFunnelAccess?: boolean;
  name: string;
  status: string;
  image?: string;
  rank?: number;
  ideasInProgress?: number;
  implementedIdeas?: number;
  points?: number;
  firstAccess?: Date;
  registration?: string;
  password?: string;
  tours: ITour;
}

export interface UserRanked {
  id: string;
  rank: number;
  name: string;
  points: number;
  email: string;
  departament?: string;
  area: string;
  image?: string;
}

export interface UserUpdate {
  id?: string;
  name?: string;
  email?: string;
  registration?: string;
  areaId?: string;
  departamentId?: string;
  image?: string;
  isAdmin?: boolean;
  isManager?: boolean;
}
export interface UserDelete {
  status: string;
}
