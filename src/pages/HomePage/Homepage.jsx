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
//import { useGetCryptoHeadlinesQuery } from "../../Services/cryptoNewsApi";
import { TopNews } from "../News/AllNews";
import Helmets from "../../SEO/Helmet";

export default function Homepage() {
  const demoImg =
    "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

  /*  const { data: cryptoNews } = useGetCryptoHeadlinesQuery({
    newsCategory: "busisness",
    count: 10,
  });*/
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;
  return (
    <>
      <Helmets
        title={"Cryptocurrency Market Overview: Prices,News & More"}
        desc={`Total Cryptocurrenceis: ${
          globalStats?.total
        }, Total Exchanges: ${millify(
          globalStats?.totalExchanges
        )},Total Market Cap: ${millify(
          globalStats?.totalMarketCap
        )},Total 24h Volume:${millify(
          globalStats?.total24hVolume
        )},Total Markets:${millify(globalStats?.totalMarkets)}`}
      />
      <Carousel fade>
        {TopNews.map((news, i) => (
          <Carousel.Item key={i}>
            <a href={news.url} target="_blank">
              <Image
                style={{
                  width: "100%",
                  height: "400px",
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
          <Col
            className="d-flex justify-content-center p-0"
            xs={12}
            md={6}
            lg={6}
          >
            <Card className="status-card p-3">
              <CardTitle className="">Total Cryptocurrenceis</CardTitle>
              <CardBody>
                <CardText className="fs-3">{globalStats.total}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col
            className="d-flex justify-content-center p-0"
            xs={12}
            md={6}
            lg={6}
          >
            <Card className="status-card p-3">
              <CardTitle className="">Total Exchanges</CardTitle>
              <CardBody>
                <CardText className="fs-3">
                  {millify(globalStats.totalExchanges)}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col
            className="d-flex justify-content-center p-0"
            xs={12}
            md={6}
            lg={6}
          >
            <Card className="status-card p-3">
              <CardTitle className="">Total Market Cap</CardTitle>
              <CardBody>
                <CardText className="fs-3">
                  {millify(globalStats.totalMarketCap)}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col
            className="d-flex justify-content-center p-0"
            xs={12}
            md={6}
            lg={6}
          >
            <Card className="status-card p-3">
              <CardTitle className="">Total 24h Volume</CardTitle>
              <CardBody>
                <CardText className="fs-3">
                  {millify(globalStats.total24hVolume)}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col
            className="d-flex justify-content-center p-0"
            xs={12}
            md={6}
            lg={6}
          >
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

      <div className="home-heading-container mt-5">
        <p className="home-title ms-5 fs-2">
          Top 10 Cryptocurrencies in the world
        </p>
        <span>
          <Link className="showmore" to="/cryptocurrencies">
            Show more
          </Link>
        </span>
      </div>
      <Cryptocurrencies simplified={true} />

      <div className="home-heading-container mt-5">
        <p className="home-title ms-5 fs-2">Latest crypto news</p>
        <span>
          <Link className="showmore " to="/news">
            Show more
          </Link>
        </span>
      </div>
      <News simplified={true} />
    </>
  );
}
