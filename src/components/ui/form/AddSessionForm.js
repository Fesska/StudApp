import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../hook/useAuth";
import { db } from "../../utils/firebase";
import moment from "moment";

function AddSessionForm(props) {
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(moment.now());
  const [format, setFormat] = useState("");
  const [room, setRoom] = useState("");
  const [teacher, setTeacher] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const fromPage = location.state?.from || "/";
  const method = location.state?.method || "add";
  const exam = location.state?.exam || null;

  const updateData = async (sessionID) => {
    const docRef = doc(db, "groups/" + user.group + "/session", sessionID);

    await updateDoc(docRef, {
      title: title,
      format: format,
      time: Timestamp.fromDate(date).toDate(),
      teacher: teacher,
      room: room,
      description: desc,
    });
  };

  const uploadData = async () => {
    const sessionCollectionRef = collection(
      db,
      "groups/" + user.group + "/session"
    );

    await addDoc(sessionCollectionRef, {
      title: title,
      format: format,
      time: Timestamp.fromDate(date).toDate(),
      teacher: teacher,
      room: room,
      description: desc,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && date && format && room && teacher) {
      if (method === "add") {
        uploadData();
      } else if (method === "update") {
        updateData(exam.id);
      }

      navigate(fromPage, { replace: true });
    }
  };

  useEffect(() => {
    if (exam) {
      setDesc(exam?.description);
      setTitle(exam?.title);
      setDate(
        new Date(exam?.time?.seconds * 1000 + exam?.time?.nanoseconds / 100000)
      );
      setFormat(exam?.format);
      setRoom(exam?.room);
      setTeacher(exam?.teacher);
      console.log(location.state);
    }
  }, []);

  return (
    <>
      <Grid>
        <Card
          variant="outlined"
          style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              {method === "add" ? "Добавить данные" : "Редактировать данные"}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Заполните поля ниже чтобы добавить данные о сессии.
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Введите название предмета..."
                    label="Название"
                    variant="outlined"
                    fullWidth
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Введите формат проведения..."
                    label="Формат проведения"
                    variant="outlined"
                    fullWidth
                    required
                    value={format}
                    helperText={"Зачет, экзамен"}
                    onChange={(e) => setFormat(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <DatePicker
                    label="Дата проведения"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue.toDate());
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Иванов И.И."
                    label="Преподаватель"
                    variant="outlined"
                    value={teacher}
                    fullWidth
                    required
                    onChange={(e) => setTeacher(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Л205"
                    label="Аудитория"
                    variant="outlined"
                    value={room}
                    fullWidth
                    required
                    helperText={"Номер аудитории или дистанционно"}
                    onChange={(e) => setRoom(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Дополнительно"
                    multiline
                    rows={4}
                    placeholder="Дополнительная информация..."
                    variant="outlined"
                    value={desc}
                    fullWidth
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Принять
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default AddSessionForm;
