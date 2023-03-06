import { ReloadOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-spinkit";
import styled from "styled-components";
import { getUsers } from "../api";
import { RootState } from "../redux/store";
import { addUsers, updateUser } from "../redux/userSlice";
import { IUser } from "../utils/models";
import { colors } from "../utils/theme";
import Card from "./components/Card";
import { FullContainer, Text, VerticalContainer } from "./components/common";

const CardsContainer = styled(Row)`
  padding: 16px;
`;

const NoUserIcon = styled(UserAddOutlined)`
  font-size: 100px;
  color: ${colors.dark1};
`;

const App = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchUsers = useCallback(() => {
    getUsers()
      .then((userData: IUser[]) => {
        dispatch(addUsers(userData));
      })
      .catch((err) => {
        console.error(err);
        setError("Not able to fetch users, Try again");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    fetchUsers();
  }, [fetchUsers]);

  if (loading)
    return (
      <FullContainer>
        <Spinner name="three-bounce" />
      </FullContainer>
    );

  if (error)
    return (
      <FullContainer>
        <VerticalContainer>
          <Text type="danger">{error}</Text>
          <Button
            type="ghost"
            icon={<ReloadOutlined />}
            loading={loading}
            onClick={fetchUsers}
          >
            Fetch again
          </Button>
        </VerticalContainer>
      </FullContainer>
    );

  if (Array.isArray(users) && users.length === 0)
    return (
      <FullContainer>
        <VerticalContainer>
          <NoUserIcon />
          <Text type="secondary">All users were removed</Text>
          <Button
            type="ghost"
            icon={<ReloadOutlined />}
            loading={loading}
            onClick={fetchUsers}
          >
            Fetch again
          </Button>
        </VerticalContainer>
      </FullContainer>
    );

  return (
    <CardsContainer>
      {users?.map((user) => (
        <Card
          key={user?.id}
          user={user}
          onUserDataUpdate={(editedUserValues) =>
            dispatch(updateUser(editedUserValues))
          }
        />
      ))}
    </CardsContainer>
  );
};

export default App;
