import React from "react";
import {
  DeleteIcon,
  GoogleIcon,
  SnowflakeIcon,
  SpeedIcon,
  UndoIcon,
} from "../Icons";

type TActionItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
};

const CARD_ACTIONS: TActionItem[] = [
  {
    icon: SnowflakeIcon,
    label: "Freeze cards",
  },
  {
    icon: SpeedIcon,
    label: "Set Spend Limit",
  },
  {
    icon: GoogleIcon,
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

type TActionItemProps = {
  action: TActionItem;
};

const ActionItemComponent: React.FC<TActionItemProps> = ({ action }) => {
  const { icon: Icon, label, onClick } = action;

  return (
    <button
      className="cursor-pointer flex flex-col gap-2 w-fit max-w-18 items-center hover:bg-[#DDE7FF] py-2 px-1 rounded-lg transition-colors"
      onClick={onClick}
    >
      <Icon className="size-8 p-1.5 rounded-full bg-[#335BAF] text-white" />
      <span className="text-xs word-wrap text-center text-[#335BAF]">
        {label}
      </span>
    </button>
  );
};

const CardActions: React.FC = () => {
  return (
    <div className="bg-[#EDF3FF] rounded-lg py-4 px-4 flex items-start gap-2 justify-evenly card-actions h-fit">
      {CARD_ACTIONS.map((action, index) => (
        <ActionItemComponent key={index} action={action} />
      ))}
    </div>
  );
};

export default CardActions;
