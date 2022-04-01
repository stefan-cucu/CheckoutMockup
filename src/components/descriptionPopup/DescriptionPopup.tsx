/*
 * Custom component for rendering product description
 */

import React from "react";

import "./DescriptionPopup.css";

export interface DescriptionPopupProps {
  description: string;
  active: boolean;
  top: number;
  left: number;
}
const DescriptionPopup: React.FC<DescriptionPopupProps> = (props) => {
  return (
    <div
      className={`description-popup ${props.active ? "active" : ""}`}
      style={{
        top: `${props.top}px`,
        left: `${props.left}px`,
      }}
    >
      <p>{props.description}</p>
    </div>
  );
};

export default DescriptionPopup;
