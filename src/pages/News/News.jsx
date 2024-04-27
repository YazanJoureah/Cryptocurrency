import { Select } from "antd";
import { useGetCryptosQuery } from "../../Services/cryptoApi";
import { useGetCryptoNewsQuery } from "../../Services/cryptoNewsApi";
import { useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import Loader from "../../Components/Loader/Loader";
import Cards from "../../Components/Card/Card";
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import Helmets from "../../SEO/Helmet";
import { articles as cryptoNews } from "./AllNews";
const { Option } = Select;

export default function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Crypto");
  const { data } = useGetCryptosQuery(100);
  /*const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 30,
  });*/

  let AllNews = cryptoNews;
  if (simplified) {
    AllNews = cryptoNews.filter((obj, index) => {
      const arrayLength = cryptoNews.length;
      const wantedItems = 10;
      return arrayLength - index <= wantedItems;
    });
  }
  /*if (isFetching) return <Loader />; //we can use isFetching as well*/
  return (
    <Stack>
      <Row className="m-3">
        {!simplified && (
          <Col>
            <Helmets
              title="Latest Cryptocurrency News and Updates"
              desc={` Explore and compare leading cryptocurrency exchanges worldwide.`}
            />
            <MDBNavbar expand="lg" light>
              <MDBContainer fluid>
                <MDBNavbarBrand>
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
        {AllNews.map((news, i) => (
          <Col key={i}>
            <Cards payload={news} News />
          </Col>
        ))}
      </Row>
    </Stack>
  );
}
