import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {
  const {name, spots, selected, onChange} = props;
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': (spots === 0)
  });
  return (
    <li className={dayClass} onClick={() => onChange(name)} data-testid="day">
      <h2 className="text--regular">{ name }</h2> 
      {(spots > 1) && <h3 className="text--light">{ spots } spots remaining</h3>}
      {(spots === 1) && <h3 className="text--light">{ spots } spot remaining</h3>}
      {(spots === 0) && <h3 className="text--light">no spots remaining</h3>}
    </li>
  );
}