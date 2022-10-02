import React, { useState, useEffect, memo, Dispatch } from "react";
import PropTypes from "prop-types";

interface WrappedSingleListItemProps {
  index?: number;
  isSelected?: boolean;
  onClickHandler: Function;
  text: string;
}
interface WrappedListComponentProps {
  items: Array<{ text: string }>;
}

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}: WrappedSingleListItemProps) => {
  return (
    <button
      className="rounded-md px-4 py-2 text-neutral-100"
      style={{ backgroundColor: isSelected ? "#4ade80" : "#f87171" }}
      onClick={() => {
        onClickHandler();
      }}
    >
      {text}
    </button>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({ items }: WrappedListComponentProps) => {
  const [selectedIndex, setSelectedIndex] = useState<any>();

  useEffect(() => {
    console.log("inside useEffect ");
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index: number) => {
    console.log("what's going on");
    setSelectedIndex(index);
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map((item: any, index: number) => (
        <SingleListItem
          key={index}
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index ? true : false}
        />
      ))}
    </div>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List;
