import { useSelector } from "react-redux";

const Notification = () => {
  const notif = useSelector((state) => {
    const message = state.notification.message;
    const type = state.notification.type;
    return { message, type };
  });

  if (notif.message === "") {
    return null;
  }

  return (
    <>
      <div className={notif.type}>{notif.message}</div>
    </>
  );
};

export default Notification;
