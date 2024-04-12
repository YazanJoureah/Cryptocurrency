import millify from "millify";
import { Input } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../Services/cryptoApi";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import {
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
  Col,
  Image,
  Row,
} from "react-bootstrap";

export default function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;

  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fillteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(fillteredData);
  }, [cryptoList, searchTerm]);
  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search cryptos"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row xs={1} md={2} className="crypto-card-container g-4">
        {cryptos?.map((currency) => (
          <Col className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card className="crypto-card">
                <Image
                  className="cardImg"
                  roundedCircle
                  src={currency.iconUrl}
                ></Image>
                <CardImgOverlay>
                  <CardTitle>{`${currency.rank}.${currency.name}`}</CardTitle>
                  <CardBody>
                    <CardText>Price: {millify(currency.price)}</CardText>
                    <CardText>
                      Market Cap: {millify(currency.marketCap)}
                    </CardText>
                    <CardText>
                      Daily Change: {millify(currency.change)}%
                    </CardText>
                  </CardBody>
                </CardImgOverlay>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
