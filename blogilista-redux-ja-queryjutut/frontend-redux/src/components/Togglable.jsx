import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "react-bootstrap";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hide = { display: visible ? "none" : "" };
  const show = { display: visible ? "" : "none" };

  const toggle = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hide}>
        <Button onClick={toggle}>{props.buttonLabel}</Button>
      </div>
      <div style={show}>
        {props.children}
        <Button onClick={toggle} data-testid="canceltoggle">
          cancel
        </Button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default Togglable;
