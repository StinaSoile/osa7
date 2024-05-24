import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const Logout = ({ handleLogout, username }) => {
  return (
    <>
      <Form onSubmit={handleLogout}>
        <Form.Group>
          Logged in as {username}
          <Button data-testid="logout" type="submit">
            logout
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};
Logout.propTypes = {
  handleLogout: PropTypes.func,
  username: PropTypes.string,
};
export default Logout;
