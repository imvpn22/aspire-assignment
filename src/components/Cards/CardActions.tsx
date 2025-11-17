import React from "react";
import {
  DeleteIcon,
  GooglePayIcon,
  SnowflakeIcon,
  SpeedIcon,
  UndoIcon,
} from "../Icons";

interface ActionItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}

const CARD_ACTIONS: ActionItem[] = [
  {
    icon: SnowflakeIcon,
    label: "Freeze cards",
  },
  {
    icon: SpeedIcon,
    label: "Set Spend Limit",
  },
  {
    icon: GooglePayIcon,
    label: "Add to GPay",
  },
  {
    icon: UndoIcon,
    label: "Replace Card",
  },
  {
    icon: DeleteIcon,
    label: "Cancel Card",
  },
];

interface ActionItemProps {
  action: ActionItem;
}

const ActionItemComponent: React.FC<ActionItemProps> = ({ action }) => {
  const { icon: Icon, label, onClick } = action;

  return (
    <button
      className="flex flex-col gap-2 w-fit max-w-16 items-center"
      onClick={onClick}
    >
      <div className="p-3 rounded-full bg-[#335BAF] text-white">
        <Icon className="" />
      </div>
      <span className="text-xs word-wrap text-center text-[#335BAF]">
        {label}
      </span>
    </button>
  );
};

interface CardActionsProps {}

const CardActions: React.FC<CardActionsProps> = ({}) => {
  return (
    <div className="bg-[#EDF3FF] rounded-lg p-6 flex items-start gap-2 justify-evenly">
      {CARD_ACTIONS.map((action, index) => (
        <ActionItemComponent key={index} action={action} />
      ))}
    </div>
  );
};

export default CardActions;
