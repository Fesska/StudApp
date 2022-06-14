import {
  Card,
  CardActions,
  Collapse,
  CardContent,
  CardHeader,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
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

function TaskCard({ task }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      square={false}
      sx={{ marginTop: `5px`, marginLeft: `5px`, marginRight: `5px` }}
      variant="outlined"
    >
      <CardHeader
        title={task.title}
        subheader={moment(task.deadline.toDate().toString())
          .locale("ru")
          .format("LL")}
      />
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
          <Typography paragraph>{task.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default TaskCard;
