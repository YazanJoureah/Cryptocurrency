import millify from "millify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../Services/cryptoApi";
import { Cryptocurrencies, News } from "../index";
import Loader from "../../Components/Loader/Loader";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Carousel,
  Container,
  Image,
} from "react-bootstrap";
import { useGetCryptoHeadlinesQuery } from "../../Services/cryptoNewsApi";

export default function Homepage() {
  const demoImg =
    "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

  const { data: cryptoNews } = useGetCryptoHeadlinesQuery({
    newsCategory: "busisness",
    count: 10,
  });
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;
  return (
    <>
      <Carousel fade>
        {cryptoNews?.articles.map((news, i) => (
          <Carousel.Item key={i}>
            <a href={news.url} target="_blank">
              <Image
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  opacity: "0.5",
                }}
                src={news.urlToImage || demoImg}
                alt="news"
              ></Image>
              <Carousel.Caption>
                <h1>{news.title}</h1>
                <p className="fs-6">
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}......`
                    : news.description}
                </p>
              </Carousel.Caption>
            </a>
          </Carousel.Item>
        ))}
      </Carousel>

      <p className="home-title mt-5 ms-4 mb-4 fs-2">Global Crypto Status</p>

      <Container>
        <Row xs={1} md={2} className="crypto-card-container g-4">
          <Col xs={6} md={6} lg={6}>
            <Card className="status-card p-3">
              <CardTitle className="">Total Cryptocurrenceis</CardTitle>
              <CardBody>
                <CardText className="fs-3">{globalStats.total}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs={6} md={6} lg={6}>
            <Card className="status-card p-3">
              <CardTitle className="">Total Exchanges</CardTitle>
              <CardBody>
                <CardText className="fs-3">
                  {millify(globalStats.totalExchanges)}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs={6} md={6} lg={6}>
            <Card className="status-card p-3">
              <CardTitle className="">Total Market Cap</CardTitle>
              <CardBody>
                <CardText className="fs-3">
                  {millify(globalStats.totalMarketCap)}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs={6} md={6} lg={6}>
            <Card className="status-card p-3">
              <CardTitle className="">Total 24h Volume</CardTitle>
              <CardBody>
                <CardText className="fs-3">
                  {millify(globalStats.total24hVolume)}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs={6} md={6} lg={6}>
            <Card className="status-card p-3">
              <CardTitle className="">Total Markets</CardTitle>
              <CardBody>
                <CardText className="fs-3">
                  {millify(globalStats.totalMarkets)}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className="home-heading-container">
        <p className="home-title mt-5 ms-4 mb-4 fs-2">
          Top 10 Cryptocurrencies in the world
        </p>
        <span className="fs-5">
          <Link className="showmore" to="/cryptocurrencies">
            Show more
          </Link>
        </span>
      </div>
      <Cryptocurrencies simplified={true} />

      <div className="home-heading-container">
        <p className="home-title mt-5 ms-4 mb-4 fs-2">Latest crypto news</p>
        <span className="fs-5">
          <Link className="showmore" to="/news">
            Show more
          </Link>
        </span>
      </div>
      <News simplified={true} />
    </>
  );
}
