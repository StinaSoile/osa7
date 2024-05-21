import { createContext, useReducer } from "react";

const notifReducer = (state = { message: "", type: "notif" }, action) => {
  switch (action.type) {
    case "NOTE": {
      const newState = {
        message: action.payload.message,
        type: action.payload.type,
      };
      return newState;
    }
    case "DEL": {
      const newState = {
        message: "",
        type: "notif",
      };
      return newState;
    }
  }
};

const NotifContext = createContext();

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducer, 0);
  return (
    <NotifContext.Provider value={[notif, notifDispatch]}>
      {props.children}
    </NotifContext.Provider>
  );
};

export default NotifContext;
