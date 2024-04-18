import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../Services/cryptoApi";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import {
  Card,
  CardBody,
  CardHeader,
  CardImgOverlay,
  CardText,
  CardTitle,
  Col,
  Form,
  Image,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";

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
  console.log(cryptoList);

  return (
    <Stack className="m-4">
      {!simplified && (
        <Row className="m-4">
          {!simplified && (
            <Col>
              <MDBNavbar expand="lg" light>
                <MDBContainer fluid>
                  <MDBNavbarBrand>
                    <h1 className="home-title">Search Cryptos</h1>
                  </MDBNavbarBrand>

                  <InputGroup>
                    <Form.Control
                      placeholder="Search Crypto"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </MDBContainer>
              </MDBNavbar>
            </Col>
          )}
        </Row>
      )}

      <Row xs={1} md={2} className="crypto-card-container g-4 ">
        {cryptos?.map((currency) => (
          <Col key={currency.id}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card style={{ border: `4px solid ${currency.color}` }}>
                <CardHeader
                  style={{ color: currency.color }}
                  as="h3"
                >{`${currency.rank}.${currency.symbol}`}</CardHeader>
                <Image
                  className="cardImg"
                  roundedCircle
                  src={currency.iconUrl}
                ></Image>
                <CardImgOverlay>
                  <CardTitle className="mt-5">{currency.name}</CardTitle>
                  <CardBody>
                    <CardText className=" mt-0 mb-3" as="h4">
                      Price: {millify(currency.price)}
                    </CardText>
                    <CardText className=" mb-3" as="h4">
                      Market Cap: {millify(currency.marketCap)}
                    </CardText>
                    <CardText className=" mb-3" as="h4">
                      Daily Change: {millify(currency.change)}%
                    </CardText>
                  </CardBody>
                </CardImgOverlay>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Stack>
  );
}
