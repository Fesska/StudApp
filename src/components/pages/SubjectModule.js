import { Button, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../hook/useAuth";
import { SFlexContainer, SubjectContainer } from "../containers/style";
import TaskCard from "../ui/cards/TaskCard";
import { SHeader } from "../ui/style/uiStyles";
import { db } from "../utils/firebase";

function SubjectModule(props) {
  const [tasks, setTasks] = useState([]);
  const [subject, setSubject] = useState();

  const { module } = useParams();
  const { user } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user.rights !== "admin") {
      alert("У вас недостаточно прав для добавления новых задач.");
    } else {
      navigate(`${location.pathname}/add`, {
        state: {
          package: subject?.packageDocs,
          subject: subject.id,
          from: location,
        },
      });
    }
  };

  const getFirestoreData = async () => {
    const getTasks = async () => {
      const tasksCollectionRef = collection(
        db,
        "groups/" + user.group + "/tasks/"
      );

      const q = query(tasksCollectionRef, where("package", "==", module));
      const data = await getDocs(q);

      setTasks(
        data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .sort((a, b) => (a.title > b.title ? 1 : -1))
      );
    };

    const getSubject = async () => {
      const subjectsCollectionRef = collection(
        db,
        "groups/" + user.group + "/subjects/"
      );

      const q = query(
        subjectsCollectionRef,
        where("packageDocs", "==", module)
      );
      const data = await getDocs(q);

      setSubject(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).pop());
    };

    getTasks();
    getSubject();
  };

  useEffect(() => {
    if (user) {
      getFirestoreData();
    }
    console.log("mounted");
  }, []);

  return (
    <>
      <div style={{ display: `block`, width: `100%` }}>
        <SHeader>
          <Typography variant="h5">
            Задачи по курсу: {subject?.title}
          </Typography>
          <Typography>
            {tasks.length !== 0
              ? "Всего заданий: " + tasks.length
              : "Пока не добавлено ни одного задания."}{" "}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginTop: `25px` }}
            onClick={handleClick}
          >
            Добавить задачу
          </Button>
        </SHeader>
        <SubjectContainer>
          <SFlexContainer style={{ marginTop: `15px` }}>
            {tasks.length !== 0
              ? tasks.map((task) => <TaskCard task={task} key={task.id} />)
              : null}
          </SFlexContainer>
        </SubjectContainer>
      </div>
    </>
  );
}

export default SubjectModule;
