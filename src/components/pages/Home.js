import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { useAuth } from "../../hook/useAuth";
import { SHeader } from "../ui/style/uiStyles";
import UserProfileCard from "../ui/cards/UserProfileCard";
import UserSubjectsCard from "../ui/cards/UserSubjectsCard";
import {
  heading,
  homeGreetingNotSignedIn,
  homeGreetingSignedIn,
} from "../utils/consts";
import { db } from "../utils/firebase";
import { HomeContentContainer } from "../containers/style";

function Home() {
  const [subjects, setSubjects] = useState([]);

  const { user } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const greetings = user ? homeGreetingSignedIn : homeGreetingNotSignedIn;

  const getSubjects = async () => {
    const subjectsCollectionRef = collection(
      db,
      "groups/" + user.group + "/subjects"
    );
    const data = await getDocs(subjectsCollectionRef);

    setSubjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleClick = () => {
    if (user.rights !== "admin") {
      alert("У вас недостаточно прав для редактирования списка предметов.");
    } else {
      navigate(`subjects/add`, {
        state: {
          from: location,
        },
      });
    }
  };

  useEffect(() => {
    if (user) {
      getSubjects();
    }
    console.log("mounted");
  }, [user]);

  return (
    <>
      <div style={{ display: `block` }}>
        <SHeader>
          <Typography variant="h4">Добро пожаловать!</Typography>
          <Typography variant="h5" marginTop={4}>
            {heading()}, {user ? user.name : "гость"}!
          </Typography>
          <Typography variant="h5">{greetings}</Typography>
        </SHeader>
        <HomeContentContainer>
          {user ? <UserProfileCard user={user} /> : null}
          {user ? (
            <UserSubjectsCard subjects={subjects} handleClick={handleClick} />
          ) : null}
        </HomeContentContainer>
        {user ? null : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Войти в систему
          </Button>
        )}
      </div>
    </>
  );
}

export default Home;
