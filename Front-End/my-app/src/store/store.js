import { createStore, combineReducers } from "redux";

const initialState = { idUser: localStorage.getItem("idUser"), isLoggedIn: localStorage.getItem("isLoggedIn")};

const authReducer = (state = initialState, action) => {
  if (action.type === "logIn") {
    localStorage.setItem("idUser", action.idUser);
    localStorage.setItem("isLoggedIn", true);
    return {
      idUser: action.idUser,
      isLoggedIn: true,
    };
  }

  if (action.type === "logOut") {
    localStorage.setItem("idUser", -1);
    localStorage.setItem("isLoggedIn", false);
    return {
      idUser: -1,
      isLoggedIn: false,
    };
  }
  return state;
};

const store = createStore(authReducer);

export default store; // provide this store to the React app