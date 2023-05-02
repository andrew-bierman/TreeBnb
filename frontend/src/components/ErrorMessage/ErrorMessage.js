import React, { useState } from "react";

const Message = ({ message }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };
  return (
    show && (
      <article className={"message is-small is-danger"}>
        <div className="message-header">
          <p>Error</p>
          <button
            className="delete"
            aria-label="delete"
            onClick={handleClose}
          ></button>
        </div>
        <div className="message-body">{message}</div>
      </article>
    )
  );
};

export default Message;
