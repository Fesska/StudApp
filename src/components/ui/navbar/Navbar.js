import React, { useContext, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineRead,
  AiOutlineSolution,
  AiOutlineFileDone,
  AiOutlineLeft,
} from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

import { ThemeContext } from "../../../App";
import {
  SDivider,
  SLogo,
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
  SLinkNotification,
  SNavbar,
  SNavbarButton,
  STheme,
  SThemeLabel,
  SThemeToggler,
  SToggleThumb,
  SItem,
} from "./style";
import { logoSVG } from "../../../assets/index";
import { useAuth } from "../../../hook/useAuth";

const navbarItems = [
  {
    label: "Главная",
    icon: <AiOutlineHome />,
    to: "/",
    Notification: 0,
  },
  {
    label: "Задачи",
    icon: <AiOutlineFileDone />,
    to: "/tasks",
    Notification: 0,
  },
  {
    label: "Документы",
    icon: <AiOutlineSolution />,
    to: "/materials",
    Notification: 0,
  },
  {
    label: "Сессия",
    icon: <AiOutlineRead />,
    to: "/session",
    Notification: 0,
  },
];

function Navbar(props) {
  const { setTheme, theme } = useContext(ThemeContext);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { signOut } = useAuth();

  const handleClick = () => {
    signOut(() => navigate("/", { replace: true }));
  };

  return (
    <SNavbar isOpen={navbarOpen}>
      <>
        <SNavbarButton
          isOpen={navbarOpen}
          onClick={() => setNavbarOpen((e) => !e)}
        >
          <AiOutlineLeft />
        </SNavbarButton>
      </>
      <SLogo>
        <img src={logoSVG} alt="logo" />
      </SLogo>
      <SDivider />
      {navbarItems.map(({ icon, label, notification, to }) => (
        <SLinkContainer key={label} isActive={pathname === to}>
          <SLink to={to} style={!navbarOpen ? { width: `fit-content` } : {}}>
            <SLinkIcon>{icon}</SLinkIcon>
            {navbarOpen && (
              <>
                <SLinkLabel>{label}</SLinkLabel>
                {!!notification && (
                  <SLinkNotification>{notification}</SLinkNotification>
                )}
              </>
            )}
          </SLink>
        </SLinkContainer>
      ))}
      <SDivider />
      <SLinkContainer>
        <SItem
          style={!navbarOpen ? { width: `fit-content` } : {}}
          onClick={handleClick}
        >
          <SLinkIcon>
            <TbLogout />
          </SLinkIcon>
          {navbarOpen && (
            <>
              <SLinkLabel>Выйти</SLinkLabel>
            </>
          )}
        </SItem>
      </SLinkContainer>
      <SDivider />
      <STheme>
        {navbarOpen && <SThemeLabel>Dark Mode</SThemeLabel>}
        <SThemeToggler
          isActive={theme === "dark"}
          onClick={() => setTheme((e) => (e === "light" ? "dark" : "light"))}
        >
          <SToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
        </SThemeToggler>
      </STheme>
    </SNavbar>
  );
}

export { Navbar };
