import { Form, Input, Modal } from "antd";

import { IEditUser, IUser } from "../../utils/models";

const { useForm } = Form;

interface IEditModalProps {
  isVisible: boolean;
  onEditComplete: (user: IEditUser) => void;
  onClose: () => void;
  user: IUser;
}

const NAME = {
  name: "name",
  label: "Name",
  required: true,
};

const EMAIL = {
  name: "email",
  label: "Email",
  required: true,
};

const PHONE = {
  name: "phone",
  label: "Phone",
  required: true,
};

const WEBSITE = {
  name: "website",
  label: "Website",
  required: true,
};

const FORM_FIELDS = [NAME, EMAIL, PHONE, WEBSITE];

const LAYOUT = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditModal = ({
  user,
  isVisible,
  onEditComplete,
  onClose,
}: IEditModalProps) => {
  const [form] = useForm();
  const { id, name, email, phone, website } = user;

  const onSubmit = () => {
    const errors = form
      .getFieldsError()
      .map(({ errors }) => errors)
      .filter((error) => Array.isArray(error) && error.length > 0);
    const hasNoErrors = Array.isArray(errors) && errors.length === 0;

    const fields = form.getFieldsValue();

    if (hasNoErrors) onEditComplete({ id, ...fields } as IEditUser);
  };

  return (
    <Modal
      title="Edit user"
      open={isVisible}
      onOk={onSubmit}
      onCancel={onClose}
    >
      <Form
        {...LAYOUT}
        form={form}
        name="control-hooks"
        initialValues={{ id, name, email, phone, website }}
      >
        {FORM_FIELDS.map(({ label, name, required }) => (
          <Form.Item
            key={name}
            name={name}
            label={label}
            rules={[{ required }]}
          >
            <Input />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default EditModal;
