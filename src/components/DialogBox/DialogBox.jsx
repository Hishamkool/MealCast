import React from "react";
import "./DialogBox.css";

function DialogBox({ open, title, description, actions, onClose }) {
  if (!open) return null;
  return (
    <div>
      <div className="dialog-backdrop" onClick={onClose}>
        <div className="dialog-cnt" onClick={(e) => e.stopPropagation()}>
          {title && <h3>{title}</h3>}
          <div className="close-btn-cnt">
            <button className="close-btn" onClick={onClose}>
              x
            </button>
          </div>
          <div className="dialog-content">
            {description && <p>{description}</p>}
          </div>
          {actions && <div className="btns-cnt">{actions}</div>}
        </div>
      </div>
    </div>
  );
}

export default DialogBox;
