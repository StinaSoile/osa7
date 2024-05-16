import PropTypes from "prop-types";

let timeoutId;
const Notification = ({ notification, setNotification }) => {
  if (!notification) {
    return null;
  }

  if (timeoutId !== undefined) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    setNotification(null);
  }, 5000);

  let className = "notif";
  if (notification.type === "error") {
    className = "error";
  }
  return <div className={className}>{notification.message}</div>;
};

Notification.propTypes = {
  notification: PropTypes.any,
  setNotification: PropTypes.func,
};

export default Notification;
