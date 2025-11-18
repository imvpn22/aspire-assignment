import React from "react";

import Logo from "../../assets/aspire_logo.svg";
import {
  ArrowCircleUpIcon,
  CreditCardIcon,
  HomeIcon,
  TransactionIcon,
  UserIcon,
} from "../Icons";
import { useLocation, useNavigate } from "react-router";

const menuItems = [
  { label: "Home", icon: <HomeIcon className="size-5" />, id: "home" },
  { label: "Cards", icon: <CreditCardIcon className="size-5" />, id: "cards" },
  {
    label: "Payments",
    icon: <TransactionIcon className="size-5" />,
    id: "payments",
  },
  {
    label: "Credit",
    icon: <ArrowCircleUpIcon className="size-5" />,
    id: "credit",
  },
  { label: "Settings", icon: <UserIcon className="size-5" />, id: "settings" },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = React.useState(() => {
    const path = location.pathname;
    if (path === "/") return "Home";
    return path.substring(1).charAt(0).toUpperCase() + path.substring(2);
  });

  const navigate = useNavigate();

  const handleMenuClick = (label: string) => {
    setActiveItem(label);
    const path = label.toLowerCase();
    if (path === "home") {
      navigate("/");
    } else {
      navigate(`/${path}`);
    }
  };

  return (
    <div className="bg-[#0C365A] w-[340px] h-full flex flex-col text-white gap-16 sidebar">
      <div className="flex flex-col gap-4 px-10 pt-10 app-logo">
        <img src={Logo} alt="Logo" className="h-8 w-auto" />
        <div className="opacity-30 logo-subtext">
          Trusted way of banking for 3,000+ SMEs and startups in Singapore
        </div>
      </div>

      <div className="flex flex-col gap-10 px-10 menubar">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`menu-item text-gray-400 bg-none border-none w-full flex items-center gap-4 cursor-pointer hover:text-[#01D167]  ${
              activeItem === item.label ? "text-[#01D167]! font-bold" : ""
            }`}
            onClick={() => handleMenuClick(item.label)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
