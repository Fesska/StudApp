import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addDoc, collection, Timestamp } from "firebase/firestore";

import { useAuth } from "../../../hook/useAuth";
import { db } from "../../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";

function AddTaskForm() {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  const pack = location.state?.package || "";
  const subject = location.state?.subject || "";
  const fromPage = location.state?.from || "/";

  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && deadline && pack && subject) {
      const tasksCollectionRef = collection(
        db,
        "groups/" + user.group + "/tasks"
      );

      const uploadData = async () => {
        await addDoc(tasksCollectionRef, {
          title: title,
          subject: subject,
          package: pack,
          description: desc,
          deadline: Timestamp.fromDate(deadline).toDate(),
        });
        console.log(title, desc, deadline, subject, pack);
      };

      uploadData();
      navigate(fromPage, { replace: true });
    }
  };

  return (
    <>
      <Grid>
        <Card
          variant="outlined"
          style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              Добавить данные
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Заполните поля ниже чтобы добавить новую задачу.
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Новая задача"
                    label="Название"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <DatePicker
                    label="Срок сдачи"
                    value={deadline}
                    onChange={(newValue) => {
                      setDeadline(newValue.toDate());
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Дополнительно"
                    multiline
                    rows={4}
                    placeholder="Дополнительная информация..."
                    variant="outlined"
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

export default AddTaskForm;
