import { ErrorType, ListPropsData } from './components/Lists';

interface ReducerStateType {
  inputValue: string;
  error: ErrorType | null;
  loading: boolean;
  page?: number;
  results: ListPropsData | null;
}

type ReducerActionStateType = Omit<ReducerStateType, 'inputValue'>;

interface ReducerActionType {
  type: string;
  payload:
    | boolean
    | number
    | string
    | ErrorType
    | ListPropsData
    | ReducerActionStateType
    | null;
}

export const ACTIONS = {
  SET_INPUT_VALUE: 'set-input-value',
  SET_ERROR: 'set-error',
  SET_LOADING: 'set-loading',
  SET_PAGE: 'set-page',
  SET_DATA: 'get-data'
};

export const initialState: ReducerStateType = {
  inputValue: "",
  error: null,
  loading: false,
  page: 1,
  results: null
};

export const reducer = (state: ReducerStateType, action: ReducerActionType) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SET_INPUT_VALUE:
      return {
        ...state,
        inputValue: payload as string
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: payload as boolean
      };
    case ACTIONS.SET_PAGE:
      return {
        ...state,
        page: payload as number
      };
    case ACTIONS.SET_DATA:
      return {
        ...state,
        error: null,
        loading: (payload as ReducerActionStateType).loading,
        page: (payload as ReducerActionStateType).page,
        results: (payload as ReducerActionStateType).results
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: (payload as ReducerActionStateType).error,
        results: (payload as ReducerActionStateType).results,
        loading: (payload as ReducerActionStateType).loading
      };
    default:
      return state;
  }
};
