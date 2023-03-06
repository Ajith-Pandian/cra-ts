import {
  DeleteFilled,
  EditOutlined,
  GlobalOutlined,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Card as AntCard, Col, Typography } from "antd";
import styled from "styled-components";
import { getAvatarUrl } from "../../utils";
import { IUser } from "../../utils/models";
import { colors } from "../../utils/theme";
import { Text } from "./common";

const CardContainer = styled(Col)`
  padding: 16px;
  .ant-card-actions {
    background-color: ${colors.lightBg2};
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

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 4px;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
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
}

const Card = ({ user, className }: ICardProps) => {
  const { username, name, email, phone, website } = user || {};

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
  return (
    <CardContainer
      key={user?.id}
      xs={24}
      sm={24}
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
          <HeartOutlined key="like" style={HEART_ICON_STYLE} />,
          <EditOutlined key="edit" style={ICON_STYLES} />,
          <DeleteFilled key="delete" style={ICON_STYLES} />,
        ]}
      >
        <AntCard.Meta title={name} />
        <Details>
          {details.map(({ icon, label, link }) => (
            <DetailRow>
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
    </CardContainer>
  );
};

export default Card;
