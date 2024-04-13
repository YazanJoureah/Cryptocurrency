import { Select } from "antd";
import { useGetCryptosQuery } from "../Services/cryptoApi";
import { useGetCryptoNewsQuery } from "../Services/cryptoNewsApi";
import { useState } from "react";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import Loader from "./Loader";

import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";

const { Option } = Select;

export default function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Crypto");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 16,
  });
  console.log(cryptoNews);
  if (isFetching) return <Loader />; //we can use isFetching as well
  return (
    <Stack>
      <Row className="m-4">
        {!simplified && (
          <Col>
            <MDBNavbar expand="lg" light>
              <MDBContainer fluid>
                <MDBNavbarBrand className="m-4">
                  <h1 className="home-title">Search Crypto News</h1>
                </MDBNavbarBrand>

                <Select
                  showSearch
                  className="Search-bar m-4"
                  placeholder={newsCategory}
                  optionFilterProp="children"
                  onChange={(value) => setNewsCategory(value)}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="Cryptocurrency">Cryptocurrency</Option>
                  {data?.data?.coins.map((coin, i) => (
                    <Option key={i} value={coin.name}>
                      {coin.name}
                    </Option>
                  ))}
                </Select>
              </MDBContainer>
            </MDBNavbar>
          </Col>
        )}
      </Row>

      <Row xs={1} md={1}>
        {cryptoNews?.articles.map((news, i) => (
          <Col key={i}>
            <Card
              className="m-4 news-card"
              bg="dark"
              text="light"
              border="primary"
            >
              <Card.Header as="h3">{news.source.name}</Card.Header>
              <Card.Img
                className="news-card-image"
                src={news.urlToImage}
                alt="Card image"
              />
              <Card.Body>
                <Card.Title as="h1">{news.title}</Card.Title>
                <Card.Text as="h5">
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}......`
                    : news.description}
                </Card.Text>
                <Button variant="light">
                  <a className="news-card-link" href={news.url} target="_blank">
                    View Source
                  </a>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Stack>
  );
}
