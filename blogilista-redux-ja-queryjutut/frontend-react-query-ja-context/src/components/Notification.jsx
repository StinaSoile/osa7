import PropTypes from "prop-types";
import NotifContext from "../NotifContext";
import { useContext } from "react";

let timeoutId;
const Notification = () => {
  const [notif, dispatch] = useContext(NotifContext);
  if (notif.message === "") {
    return null;
  }

  if (timeoutId !== undefined) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    dispatch({
      type: "DEL",
    });
  }, 5000);

  return <div className={notif.type}>{notif.message}</div>;
};

Notification.propTypes = {
  notification: PropTypes.any,
  setNotification: PropTypes.func,
};

export default Notification;
