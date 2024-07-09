import { Departament } from 'interfaces/departament';

interface DepartamentProps {
  departaments: Departament[];
  departament: Departament;
}

type DepartamentActions =
  | { type: 'SET_DEPARTAMENTS'; departaments: Departament[] }
  | { type: 'SET_DEPARTAMENT'; departament: Departament };

export const DepartamentDefaultValues = {
  departaments: [],
  departament: {},
} as DepartamentProps;

export const DepartamentReducer = (
  state: DepartamentProps,
  action: DepartamentActions
): DepartamentProps => {
  const newState = { ...state };

  switch (action.type) {
    case 'SET_DEPARTAMENTS':
      newState.departaments = action.departaments;
      break;
    case 'SET_DEPARTAMENT':
      newState.departament = action.departament;
      break;
    default:
      break;
  }
  return newState;
};
