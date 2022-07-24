import React from "react";
import newsImage from "../assets/image/defaultNewsImage.jpg";
import { Typography, Row, Card } from "antd";
import moment from "moment";
import { useGetNewsQuery } from "../services/newsApi";
import Loading from "./Loading";
const { Title } = Typography;

const News = ({ country }) => {
  const defaultImage = newsImage;
  const { data: newsData } = useGetNewsQuery({ country });
  if (!newsData) return <Loading />;

  return (
    <div>
      {newsData.value.map((item, index) => {
        return (
          <>
            <Row style={{ marginBottom: "20px" }}>
              <div className="overflow-hidden">
                <a
                  href={item?.url}
                  target="_blank"
                  rel="noreferrer"
                  key={index}
                >
                  <Card hoverable className="news-card">
                    <Title level={5}>{item.name}</Title>
                    <div className="news-description">
                      <img
                        src={item?.image?.thumbnail?.contentUrl || defaultImage}
                        style={{ width: "150px", height: "150px" }}
                        alt="news-img"
                      />
                      <p>{item.description}</p>
                    </div>
                    <div className="news-footer">
                      <div className="news-footer-group">
                        <img
                          src={
                            item?.provider[0]?.image?.thumbnail?.contentUrl ||
                            defaultImage
                          }
                          style={{ width: "30px", height: "30px" }}
                          alt="povider-img"
                        />
                        <p>{item?.provider[0]?.name}</p>
                      </div>
                      <p>{moment(item?.datePublished).fromNow()}</p>
                    </div>
                  </Card>
                </a>
              </div>
            </Row>
          </>
        );
      })}
    </div>
  );
};

export default News;
