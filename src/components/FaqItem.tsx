import React from "react";
import clsx from "clsx";
import { Collapse } from "react-collapse";

interface FaqItemType {
  id: string | number;
  question: string;
  answer: string;
}

interface FaqItemProps {
  item: FaqItemType;
  index: number;
  activeId: string | number | null;
  setActiveId: (id: string | number | null) => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ item, index, activeId, setActiveId }) => {
  const active = activeId === item.id;

  const handleClick = () => {
    setActiveId(active ? null : item.id);
  };

  return (
    <div className="relative z-2 mb-16">
      <div
        className="group relative flex cursor-pointer items-center justify-between gap-10 px-7"
        onClick={handleClick}
      >
        <div className="flex-1">
          <div className="small-compact mb-1.5 text-p3 max-lg:hidden">
            {index < 10 ? "0" : ""}
            {index}
          </div>
          <div
            className={clsx(
              "h6 text-p4 transition-colors duration-500 max-md:flex max-md:min-h-20 max-md:items-center",
              active && "max-lg:text-p1"
            )}
          >
            {item.question}
          </div>
        </div>

        <div
          className={clsx(
            "faq-icon relative flex size-12 items-center justify-center rounded-full border-2 border-s2 shadow-400 transition-all duration-500 group-hover:border-s4",
            active && "before:bg-p1 after:rotate-0 after:bg-p1"
          )}
        >
          <div className="g4 size-11/12 rounded-full shadow-300" />

          {/* Plus/Minus Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-4 h-4">
              {/* Horizontal line (always visible) */}
              <div
                className={clsx(
                  "absolute top-1/2 left-0 w-full h-0.5 bg-current transition-all duration-300",
                  active ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                )}
              />
              {/* Vertical line (turns into minus when active) */}
              <div
                className={clsx(
                  "absolute top-1/2 left-0 w-full h-0.5 bg-current transition-all duration-300",
                  active ? "rotate-0" : "rotate-90"
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <Collapse isOpened={active}>
        <div className="body-3 px-7 py-3.5">{item.answer}</div>
      </Collapse>

      <div
        className={clsx(
          "g5 -bottom-7 -top-7 left-0 right-0 -z-1 rounded-3xl opacity-0 transition-opacity duration-500 absolute",
          active && "opacity-100"
        )}
      >
        <div className="g4 absolute inset-0.5 -z-1 rounded-3xl" />
        <div className="absolute left-8 top-0 h-0.5 w-40 bg-p1" />
      </div>
    </div>
  );
};

export default FaqItem;
