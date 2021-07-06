import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import ProfileLayout from "@components/layouts/ProfileLayout";
import { Modal, Button } from 'antd';
import { useContext, useState } from 'react';

const { SubMenu } = Menu;

const Profile = () => {
    const [visible, setVisible] = useState(false);

    return (
        <ProfileLayout className="main-content-no-back">
            <Button onClick={() => setVisible(true)}>
                Open Modal of 1000px width
            </Button>
            <Modal
                title="Modal 1000px width"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </ProfileLayout>
    );
}

export default Profile;