import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import Spinner from "react-spinkit";

import { getUsers } from "../api";
import { getAvatarUrl } from "../utils";
import { IUser } from "../utils/models";
import { Text } from "./components";

const App = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((userData: IUser[]) => {
        setUsers(userData);
      })
      .catch((err) => {
        console.error(err);
        setError("Not able to fetch users, Try again");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner name="three-bounce" />;
  if (error) return <Text type="danger">{error}</Text>;

  return (
    <>
      <Row>
        {users?.map(({ id, name, avatar, username }, index) => (
          <Col key={id} xs={24} sm={24} md={8} lg={8} xl={6} span={6}>
            <img
              style={{ height: "200px", width: "200px" }}
              src={getAvatarUrl(username)}
              alt={`${name}-avatar`}
            />
            <Text>{name}</Text>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default App;
