import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import { AiOutlineMail, AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import LetterAvatar from "../LetterAvatar";

function UserProfileCard(props) {
  return (
    <div>
      <Card
        variant="outlined"
        style={{
          maxWidth: 450,
          padding: "20px 5px",
          marginTop: 15,
          marginLeft: 15,
          margin: 10,
        }}
      >
        <Typography sx={{ marginLeft: `15px` }}>Ваш профиль:</Typography>
        <CardHeader
          avatar={<LetterAvatar name={props.user.name.toString()} />}
          title={props.user.name}
        />
        <CardContent>
          <div
            style={{
              display: `flex`,
              justifyContent: `center`,
              alignItems: `center`,
            }}
          >
            <AiOutlineMail />
            <Typography> E-mail: {props.user.login}</Typography>
          </div>
          <div
            style={{
              display: `flex`,
              justifyContent: `flex-start`,
              alignItems: `center`,
            }}
          >
            <AiOutlineUsergroupAdd />
            <Typography> Группа: {props.user.group}</Typography>
          </div>
          <div
            style={{
              display: `flex`,
              justifyContent: `flex-start`,
              alignItems: `center`,
            }}
          >
            <MdOutlineAdminPanelSettings />
            <Typography>
              {" "}
              Роль:{" "}
              {props.user.rights === "admin" ? "Администратор" : "Пользователь"}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserProfileCard;
