import PropTypes from "prop-types";
import { useState } from "react";

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
        <button onClick={toggle}>{props.buttonLabel}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={toggle} data-testid="canceltoggle">
          cancel
        </button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default Togglable;
