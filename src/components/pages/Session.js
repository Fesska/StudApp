import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { db } from "../utils/firebase";
import { SHeader } from "../ui/style/uiStyles";
import SessionCard from "../ui/cards/SessionCard";
import { SessionCardContainer } from "../containers/style";
import { useAuth } from "../../hook/useAuth";
import moment from "moment";
import "moment/locale/ru";
import { heading } from "../utils/consts";

function Session(props) {
  const [session, setSession] = useState([]);
  const { user } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user.rights !== "admin") {
      alert("У вас недостаточно прав для добавления новых задач.");
    } else {
      navigate(`${location.pathname}/add`, {
        state: {
          from: location,
        },
      });
    }
  };

  const getFirebaseData = async () => {
    const sessionCollectionRef = collection(
      db,
      "groups/" + user.group + "/session"
    );
    const data = await getDocs(sessionCollectionRef);

    setSession(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getFirebaseData();
    console.log("mounted ");
  }, []);

  return (
    <>
      <div style={{ display: `block`, width: `100%` }}>
        <SHeader>
          <Typography variant="h3">
            Промежуточная аттестация (экзамены, зачеты)
          </Typography>
          <Typography variant="h5">
            {heading()}, {user.name}! Ниже представлено расписание и информация
            о промежуточной аттестации в вашей группе.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginTop: `25px` }}
            onClick={handleClick}
          >
            Добавить информацию о сессии
          </Button>
        </SHeader>
        <SessionCardContainer style={{ marginTop: `15px` }}>
          {session.map((exam) => (
            <div key={exam.id} style={{ height: `auto` }}>
              <SessionCard exam={exam} />
            </div>
          ))}
        </SessionCardContainer>
      </div>
    </>
  );
}

export default Session;
