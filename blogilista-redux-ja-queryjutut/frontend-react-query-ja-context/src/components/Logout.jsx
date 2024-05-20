import PropTypes from "prop-types";

const Logout = ({ handleLogout, username }) => {
  return (
    <>
      <form onSubmit={handleLogout}>
        Logged in as {username}
        <button data-testid="logout" type="submit">
          logout
        </button>
      </form>
    </>
  );
};
Logout.propTypes = {
  handleLogout: PropTypes.func,
  username: PropTypes.string,
};
export default Logout;
