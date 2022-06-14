import {
  Card,
  Collapse,
  CardContent,
  CardHeader,
  IconButton,
  styled,
  Typography,
  Link,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import React from "react";

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

function MaterialsCard({ subject, items }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      square={false}
      sx={{
        marginTop: `5px`,
        marginLeft: `5px`,
        marginRight: `5px`,
        width: `500px`,
        height: `auto`,
      }}
      variant="outlined"
    >
      <CardHeader
        title={subject.title}
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <MdExpandMore />
          </ExpandMore>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Материалы курса:</Typography>
          {items.map((item) => (
            <div key={item.url} style={{ display: `block`, marginTop: `5px` }}>
              <Link href={item.url} underline="hover">
                {item.name}
              </Link>
            </div>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default MaterialsCard;
