import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";

import { SHeader } from "../ui/style/uiStyles";
import { useAuth } from "../../hook/useAuth";
import {
  heading,
  homeGreetingNotSignedIn,
  homeGreetingSignedIn,
} from "../utils/consts";
import {
  HomeContentContainer,
  SFixedContainer,
  SFlexContainer,
} from "../containers/style";
import UserProfileCard from "../ui/cards/UserProfileCard";
import { useLocation, useNavigate } from "react-router-dom";
import UserSubjectsCard from "../ui/cards/UserSubjectsCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

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
  }, []);

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
