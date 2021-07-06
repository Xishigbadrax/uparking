import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import ProfileLayout from "@components/layouts/ProfileLayout";

const { SubMenu } = Menu;

const Profile = () => {
    const handleClick = (e) => {
        console.log('click ', e);
    };

    return (
        <ProfileLayout className="main-content-no-back">
            aaaaaaa
        </ProfileLayout>
    );
}

export default Profile;