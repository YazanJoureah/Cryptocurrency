import { Select, Typography } from "antd";
import { useGetCryptosQuery } from "../Services/cryptoApi";
import { useGetCryptoNewsQuery } from "../Services/cryptoNewsApi";
import { useState } from "react";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImg =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

export default function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 16,
  });
  console.log(cryptoNews);
  if (isFetching) return "Loading..."; //we can use isFetching as well
  return (
    <Stack>
      <Row>
        {!simplified && (
          <Col>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin, i) => (
                <Option key={i} value={coin.name}>
                  {coin.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}
      </Row>

      <Row xs={1} md={1}>
        {cryptoNews?.results.map((news, i) => (
          <Col key={i}>
            <Card className="m-4">
              <Card.Header as="h5">Cryptonews</Card.Header>
              <Card.Body>
                <Card.Title>{news.title}</Card.Title>
                <Card.Text>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}......`
                    : news.description}
                </Card.Text>
                <Button variant="primary">
                  <a href={news.url} target="_blank">
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
