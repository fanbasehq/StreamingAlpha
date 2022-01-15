import React from "react";

export interface MenuItemProps {
  icon?: string;
  action?: () => void;
  isActive?: () => boolean;
  title?: string;
}

export default function MenuItem({
  icon,
  title,
  action,
  isActive,
}: MenuItemProps) {
  return (
    <button
      className={`menu-item${isActive?.() ? " is-active" : ""}`}
      onClick={action}
      title={title}
    >
      <i className={`bx ${icon}`} />
    </button>
  );
}
