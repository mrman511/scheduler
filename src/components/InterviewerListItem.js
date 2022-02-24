import React from "react";
import "components/interviewerListItem.scss";
import classNames from "classnames";

export default function InterveiwerListItem(props) {
  const { name, avatar, selected } = props;
  const interviewClass =  classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  })
  
  
  return (
    <li className={ interviewClass } onClick={ props.setInterviewer }>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}