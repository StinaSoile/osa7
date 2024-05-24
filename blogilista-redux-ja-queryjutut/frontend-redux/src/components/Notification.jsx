import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notif = useSelector((state) => {
    const message = state.notification.message;
    const type = state.notification.type;
    return { message, type };
  });

  if (notif.message === "") {
    return null;
  }
  let variant = "info";
  if (notif.type === "notif") variant = "success";
  if (notif.type === "error") variant = "danger";

  return (
    <>
      <Alert variant={variant}>{notif.message}</Alert>
    </>
  );
};

export default Notification;
