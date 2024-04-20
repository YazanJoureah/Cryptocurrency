import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../Services/cryptoApi";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import { Col, Form, InputGroup, Row, Stack } from "react-bootstrap";
import Cards from "../../Components/Card/Card";
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
        <Row className="m-3">
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
              <Cards payload={currency} />
            </Link>
          </Col>
        ))}
      </Row>
    </Stack>
  );
}
