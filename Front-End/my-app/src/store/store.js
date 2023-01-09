import { createStore, combineReducers } from "redux";

const initialState = { idUser: -1, isLoggedIn: false };

const authReducer = (state = initialState, action) => {
  if (action.type === "logIn") {
    return {
      idUser: action.idUser,
      isLoggedIn: true,
    };
  }

  if (action.type === "logOut") {
    return {
      idUser: -1,
      isLoggedIn: false,
    };
  }
  return state;
};

const store = createStore(authReducer);

export default store; // provide this store to the React app