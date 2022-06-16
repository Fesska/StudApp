import {
  Card,
  CardActions,
  Collapse,
  CardContent,
  CardHeader,
  IconButton,
  styled,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  MdExpandMore,
  MdOutlineDelete,
  MdSystemUpdateAlt,
} from "react-icons/md";
import React from "react";
import moment from "moment";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function SessionCard({ exam, handleDelete, handleUpdate }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteClick = () => {
    const id = exam.id;
    handleDelete(id);
  };

  const handleUpdateClick = () => {
    const id = exam;
    handleUpdate(id);
  };

  return (
    <Card
      square={false}
      sx={{
        marginTop: `5px`,
        marginLeft: `5px`,
        marginRight: `5px`,
        width: `375px`,
        height: `auto`,
      }}
      variant="outlined"
    >
      <CardHeader
        title={exam.title}
        action={
          <>
            <Tooltip title={"Удалить"}>
              <IconButton onClick={handleDeleteClick}>
                <MdOutlineDelete />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Редактировать"}>
              <IconButton onClick={handleUpdateClick}>
                <MdSystemUpdateAlt />
              </IconButton>
            </Tooltip>
          </>
        }
        subheader={moment(exam.time.toDate().toString())
          .locale("ru")
          .format("LL")}
      />
      <CardContent>
        <Typography variant="body" color="text.secondary">
          {exam.teacher}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Аудитория: {exam.room}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Формат: {exam.format}
        </Typography>
      </CardContent>
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <MdExpandMore />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Дополнительно:</Typography>
          <Typography paragraph>{exam.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default SessionCard;
