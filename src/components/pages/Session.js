import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../hook/useAuth";
import { SessionCardContainer } from "../containers/style";
import { SHeader } from "../ui/style/uiStyles";
import SessionCard from "../ui/cards/SessionCard";
import { heading } from "../utils/consts";
import { db } from "../utils/firebase";

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

    setSession(
      data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => (a.time.toDate() > b.time.toDate() ? 1 : -1))
    );
  };

  useEffect(() => {
    if (user) {
      getFirebaseData();
    }
    console.log("mounted ");
  }, []);

  return (
    <>
      <div style={{ display: `block`, width: `100%` }}>
        <SHeader>
          <Typography variant="h3">
            Промежуточная аттестация (экзамены, зачеты)
          </Typography>
          <Typography variant="h5" marginTop={4}>
            {heading()}, {user?.name}!{" "}
            {session.length !== 0
              ? "Ниже представлено расписание и информация о промежуточной аттестации в вашей группе."
              : "Пока не добавлено ни одной контрольной точки."}
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
        {session.length !== 0 ? (
          <SessionCardContainer style={{ marginTop: `15px` }}>
            {session.map((exam) => (
              <div key={exam.id} style={{ height: `auto` }}>
                <SessionCard exam={exam} />
              </div>
            ))}
          </SessionCardContainer>
        ) : null}
      </div>
    </>
  );
}

export default Session;
