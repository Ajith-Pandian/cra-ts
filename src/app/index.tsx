import { Row } from "antd";
import { useEffect, useState } from "react";
import Spinner from "react-spinkit";

import styled from "styled-components";
import { getUsers } from "../api";
import { IUser } from "../utils/models";
import Card from "./components/Card";
import { FullContainer, Text } from "./components/common";

const CardsContainer = styled(Row)`
  padding: 16px;
`;

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

  if (loading)
    return (
      <FullContainer>
        <Spinner name="three-bounce" />
      </FullContainer>
    );
  if (error)
    return (
      <FullContainer>
        <Text type="danger">{error}</Text>
      </FullContainer>
    );

  return (
    <CardsContainer>
      {users?.map((user) => (
        <Card
          user={user}
          onUserDataUpdate={(editedUserValues) => {
            console.log({ editedUserValues });
          }}
        />
      ))}
    </CardsContainer>
  );
};

export default App;
