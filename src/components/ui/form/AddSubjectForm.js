import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useAuth } from "../../../hook/useAuth";
import { db } from "../../utils/firebase";

function AddSubjectForm(props) {
  const [title, setTitle] = useState();
  const [format, setFormat] = useState();
  const [teacher, setTeacher] = useState();

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const fromPage = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && teacher && format) {
      const packageDocs = uuidv4();

      const subjectsCollectionRef = collection(
        db,
        "groups/" + user.group + "/subjects"
      );

      const uploadData = async () => {
        await addDoc(subjectsCollectionRef, {
          title: title,
          format: format,
          teacher: teacher,
          packageDocs: packageDocs,
        });
        console.log({
          title: title,
          format: format,
          teacher: teacher,
          packageDocs: packageDocs,
        });
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
              Заполните поля ниже чтобы добавить новый предмет.
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
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Иванов И.И."
                    label="Преподаватель"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setTeacher(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Укажите форму аттестации..."
                    label="Форма аттестации"
                    variant="outlined"
                    fullWidth
                    required
                    helperText={"Зачет, экзамен"}
                    onChange={(e) => setFormat(e.target.value)}
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

export default AddSubjectForm;
