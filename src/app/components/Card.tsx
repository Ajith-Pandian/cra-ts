import {
  DeleteFilled,
  EditOutlined,
  GlobalOutlined,
  HeartFilled,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Card as AntCard, Col, Typography } from "antd";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { removeUser, updateUserLike } from "../../redux/userSlice";
import { getAvatarUrl } from "../../utils";
import { IEditUser, IUser } from "../../utils/models";
import { colors } from "../../utils/theme";
import { Text } from "./common";
import EditModal from "./EditModal";

const CardContainer = styled(Col)`
  padding: 16px;
  .ant-card-actions {
    background-color: ${colors.lightBg2};
  }
  .ant-modal-header {
    padding: 16px 24px !important;
    color: rgba(0, 0, 0, 0.65);
    color: red !important;
    background: red;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 4px 4px 0 0;
  }
`;

const CardBox = styled(AntCard)`
  && {
    border-radius: 0;
  }
`;

const ImageContainer = styled.div`
  && {
    display: grid;
    background-color: ${colors.lightBg};
    place-items: center;
  }
`;

const UserAvatar = styled.img`
  height: 200px;
  width: 200px;
`;

const Title = styled(AntCard.Meta)`
  text-align: center;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  gap: 4px;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const DetailText = styled(Text)`
  && {
    font-size: 12px;
  }
`;

const DetailLink = styled(Typography.Link)`
  && {
    color: ${colors.dark1};
  }
`;

const ICON_STYLES = {
  fontSize: "18px",
};

const HEART_ICON_STYLE = {
  ...ICON_STYLES,
  color: "red",
};

const DETAILS_ICON_STYLE = {
  ...ICON_STYLES,
  color: colors.dark1,
};

interface ICardProps {
  user: IUser;
  className?: string;
  onUserDataUpdate: (user: IEditUser) => void;
}

const Card = ({ user, className, onUserDataUpdate }: ICardProps) => {
  const [isModalVisible, setModalVisibility] = useState<boolean>(false);
  const {
    id: userId,
    username,
    name,
    email,
    phone,
    website,
    liked,
  } = user || {};

  const dispatch = useDispatch();

  const details = [
    {
      icon: <MailOutlined style={DETAILS_ICON_STYLE} />,
      label: email,
      link: `mailto:${email}`,
    },
    { icon: <PhoneOutlined style={DETAILS_ICON_STYLE} />, label: phone },
    {
      icon: <GlobalOutlined style={DETAILS_ICON_STYLE} />,
      label: `https://${website}`,
      link: `https://${website}`,
    },
  ];

  const openEditModal = useCallback(() => {
    setModalVisibility(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setModalVisibility(false);
  }, []);

  return (
    <CardContainer
      key={user?.id}
      xs={24}
      sm={12}
      md={8}
      lg={8}
      xl={6}
      span={6}
      className={className}
    >
      <CardBox
        cover={
          <ImageContainer>
            <UserAvatar src={getAvatarUrl(username)} alt={`${name}-avatar`} />
          </ImageContainer>
        }
        actions={[
          liked ? (
            <HeartFilled
              key="unlike"
              title="Unlike"
              style={HEART_ICON_STYLE}
              onClick={() =>
                dispatch(updateUserLike({ userId, isLiked: false }))
              }
            />
          ) : (
            <HeartOutlined
              key="like"
              title="Like"
              style={HEART_ICON_STYLE}
              onClick={() =>
                dispatch(updateUserLike({ userId, isLiked: true }))
              }
            />
          ),
          <EditOutlined
            key="edit"
            title="Edit"
            style={ICON_STYLES}
            onClick={openEditModal}
          />,
          <DeleteFilled
            key="delete"
            title="Delete"
            style={ICON_STYLES}
            onClick={() => dispatch(removeUser({ userId }))}
          />,
        ]}
      >
        <Title title={name} />
        <Details>
          {details.map(({ icon, label, link }) => (
            <DetailRow key={label}>
              {icon}
              {link ? (
                <DetailLink href={link} target={"_blank"}>
                  {label}
                </DetailLink>
              ) : (
                <DetailText>{label}</DetailText>
              )}
            </DetailRow>
          ))}
        </Details>
      </CardBox>
      <EditModal
        isVisible={isModalVisible}
        onEditComplete={(user) => {
          onUserDataUpdate(user);
          closeEditModal();
        }}
        onClose={closeEditModal}
        user={user}
      />
    </CardContainer>
  );
};

export default Card;
