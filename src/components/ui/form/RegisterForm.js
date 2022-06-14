import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hook/useAuth";
import { db } from "../../utils/firebase";

function RegisterForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState("");
  const [name, setName] = useState("");
  const [loginErr, setLoginErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [groupErr, setGroupErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);

  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginErr(false);
    setPasswordErr(false);
    setGroupErr(false);
    const temp = groups.includes(group);

    if (login === "") {
      setLoginErr(true);
    }
    if (password === "") {
      setPasswordErr(true);
    }
    if (group === "") {
      setGroupErr(true);
    }
    if (name === "") {
      setNameErr(true);
    }

    if (login && password && group) {
      const rights = temp ? "user" : "admin";
      const user = {
        login: login,
        password: password,
        group: group,
        name: name,
        rights: rights,
      };

      signUp(user, () => navigate("/", { replace: true }));
    }
  };

  useEffect(() => {
    const getFirestoreData = async () => {
      const groupsCollectionRef = collection(db, "groups");
      const data = await getDocs(groupsCollectionRef);

      setGroups(data.docs.map((doc) => doc.id));
    };

    getFirestoreData();
    console.log("mounted");
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
              Регистрация
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Заполните поля ниже, чтобы создать аккаунт
            </Typography>
            <form noValidate autoComplete="off">
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    placeholder="user@example.com"
                    label="Адрес электронной почты"
                    variant="outlined"
                    fullWidth
                    required
                    error={loginErr}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Петр"
                    label="Отображаемое имя"
                    variant="outlined"
                    fullWidth
                    required
                    error={nameErr}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Придумайте пароль"
                    label="Пароль"
                    variant="outlined"
                    type={"password"}
                    fullWidth
                    required
                    error={passwordErr}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="БВТ1801"
                    label="Группа"
                    variant="outlined"
                    fullWidth
                    required
                    error={groupErr}
                    onChange={(e) => setGroup(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Зарегистрироваться
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

export default RegisterForm;
