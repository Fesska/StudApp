import {
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInForm(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginErr(false);
    setPasswordErr(false);

    if (login === "") {
      setLoginErr(true);
    }
    if (password === "") {
      setPasswordErr(true);
    }

    if (login && password) {
      props.handleLogin(login, password);
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
              Войти в систему
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Войдите с помощью логина и пароля.
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
                    placeholder="Введите пароль"
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
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Войти
                  </Button>
                </Grid>
                <Grid item xs={12} align={"center"}>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate("/register")}
                  >
                    Нет аккаунта? Нажмите, чтобы зарегистрироваться!
                  </Link>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default SignInForm;
