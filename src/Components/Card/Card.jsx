import millify from "millify";
import {
  Button,
  CardBody,
  CardHeader,
  CardImgOverlay,
  CardText,
  Image,
  Card,
} from "react-bootstrap";

import "./Card.css";

const Cards = ({ payload, News }) => {
  const data = {
    title: News ? payload?.source?.name : `${payload?.rank}.${payload?.symbol}`,
    color: !News ? payload?.color : "white",
    img: News ? payload?.urlToImage : payload?.iconUrl,
    content: !News
      ? {
          price: payload?.price,
          marketCap: payload?.marketCap,
          change: payload?.change,
        }
      : {
          title: payload?.title,
          description: payload?.description,
          url: payload?.url,
        },
  };

  return (
    <Card
      className="m-3"
      bg={News ? "dark" : "light"}
      text={News ? "light" : "dark"}
      style={{ border: News ? "#038edc" : `2px solid ${data.color}` }}
    >
      <CardHeader style={{ color: data.color }} as="h3">
        {data.title}
      </CardHeader>
      <Image
        className="cardImg"
        style={{
          height: News ? "auto" : "200px",
          width: News ? "100%" : "200px",
          opacity: News ? "1" : "0.5",
        }}
        src={data.img}
      ></Image>
      {News ? (
        <Card.Body>
          <Card.Title as="h1">{data.content.title}</Card.Title>
          <Card.Text as="h5">
            {data.content.description > 100
              ? `${data.content.description.substring(0, 100)}......`
              : data.content.description}
          </Card.Text>
          <Button variant="light">
            <a
              className="news-card-link"
              href={data.content.url}
              target="_blank"
            >
              View Source
            </a>
          </Button>
        </Card.Body>
      ) : (
        <CardImgOverlay>
          <CardBody>
            <CardText className=" mt-0 mb-3" as="h4">
              Price: {millify(data.content.price)}
            </CardText>
            <CardText className=" mb-3" as="h4">
              Market Cap: {millify(data.content.marketCap)}
            </CardText>
            <CardText className=" mb-3" as="h4">
              Daily Change: {millify(data.content.change)}%
            </CardText>
          </CardBody>
        </CardImgOverlay>
      )}
    </Card>
  );
};

export default Cards;
