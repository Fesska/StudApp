import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { db } from "../utils/firebase";
import TaskCard from "../ui/cards/TaskCard";
import { SFlexContainer, SubjectContainer } from "../containers/style";
import { SHeader } from "../ui/style/uiStyles";
import { useAuth } from "../../hook/useAuth";
import { heading } from "../utils/consts";

function Tasks(props) {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  var count = 0;

  const getTasks = async () => {
    const tasksCollectionRef = collection(
      db,
      "groups/" + user.group + "/tasks"
    );
    const data = await getDocs(tasksCollectionRef);

    setTasks(
      data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => (a.title > b.title ? 1 : -1))
    );
  };

  const getSubjects = async () => {
    const subjectsCollectionRef = collection(
      db,
      "groups/" + user.group + "/subjects"
    );
    const data = await getDocs(subjectsCollectionRef);

    setSubjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const tasksCount = (subject) => {
    return tasks.reduce((count, task) => {
      count = task.subject === subject ? count + 1 : count + 0;
      return count;
    }, 0);
  };

  const getHeaderText = (subjectsCount, tasksCount) => {
    var word1 = "задача";
    var word2 = "предметам";

    if (tasksCount > 1) {
      word1 = "задачи";
    }
    if (tasksCount > 4) {
      word1 = "задач";
    }
    if (subjectsCount === 1) {
      word2 = "предмету";
    }

    return (
      heading() +
      ", " +
      user.name +
      "! На данный момент  " +
      tasks.length +
      " " +
      word1 +
      " " +
      "по " +
      subjects.length +
      " " +
      word2 +
      ". Ознакомьтесь с актуальными задачами ниже."
    );
  };

  useEffect(() => {
    getTasks();
    getSubjects();
    console.log("mounted");
  }, []);

  return (
    <>
      <div style={{ display: `block`, width: `100%` }}>
        <SHeader>
          <Typography variant="h3">Задачи по курсам</Typography>
          <Typography variant="h5">
            {getHeaderText(subjects.length, tasks.length)}
          </Typography>
        </SHeader>
        {subjects.map((subject) => {
          count = 0;
          return (
            <SubjectContainer key={subject.id}>
              <Typography variant="h5">{subject.title}</Typography>
              <Typography>Всего заданий: {tasksCount(subject.id)} </Typography>
              <SFlexContainer style={{ marginTop: `15px` }}>
                {tasks.map((task) => {
                  if (task.subject === subject.id) {
                    if (++count < 5) {
                      return <TaskCard task={task} key={task.id} />;
                    }
                  }
                })}
              </SFlexContainer>
              <Button
                variant="outlined"
                sx={{
                  marginTop: `20px`,
                  justifySelf: `flex-end`,
                }}
                onClick={() => {
                  navigate(`/tasks/${subject.packageDocs}`);
                }}
              >
                Перейти к модулю
              </Button>
            </SubjectContainer>
          );
        })}
      </div>
    </>
  );
}

export default Tasks;
