import { useState } from "react";
import { deleteConfirmation } from "../../../utils/helpers";

function GroupWithDeleteIcon({
  item,
  itemType,
  isSelected,
  removeClickAction,
  itemClickAction,
}) {
  const [hoverClass, setHoverClass] = useState("complain-remove-btn");

  return (
    <>
      <div
        className={`chief-complain-item mp-20 ${
          isSelected ? "is-selected" : ""
        }`}
        key={item.id}
        onMouseOver={() => {
          setHoverClass("complain-remove-btn-hover");
        }}
        onMouseOut={() => {
          setHoverClass("complain-remove-btn");
        }}
      >
        <span
          className="cursor-pointer"
          onClick={() =>
            itemClickAction(itemType === "advice" ? item.name : item)
          }
        >
          {item.name}
        </span>
        <span
          className={hoverClass}
          onClick={() => deleteConfirmation(removeClickAction, item.id)}
        >
          <i
            className="fa fa-minus-circle"
            aria-hidden="true"
            style={{ fontSize: "14px" }}
          ></i>
        </span>
      </div>
    </>
  );
}

export default GroupWithDeleteIcon;
