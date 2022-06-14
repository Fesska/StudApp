import {
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

function UserSubjectsCard(props) {
  return (
    <div>
      <Card
        variant="outlined"
        style={{
          maxWidth: 450,
          padding: "20px 5px",
          marginTop: 15,
          marginLeft: 15,
          margin: 10,
        }}
      >
        <Typography sx={{ marginLeft: `15px` }}>Список предметов:</Typography>
        <CardContent>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
            component="nav"
          >
            {props.subjects.length !== 0 ? (
              props.subjects.map((subject) => (
                <div key={subject.id}>
                  <ListItem>
                    <ListItemText primary={subject.title} />
                  </ListItem>
                  <Divider />
                </div>
              ))
            ) : (
              <ListItem>
                <ListItemText primary={"Ваш список предметов пуст!"} />
              </ListItem>
            )}
          </List>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginTop: `25px` }}
            onClick={props.handleClick}
            fullWidth
          >
            Добавить предметы
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserSubjectsCard;
