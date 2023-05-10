import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;
import type { MenuProps, MenuTheme } from 'antd/es/menu';
import { MessageOutlined } from '@ant-design/icons';
import {
    BillingIcon,
    CampaignIcon,
    DashboardIcon,
    HelpIcon,
    LogOutIcon,
    ReportIcon,
    SettingIcon,
} from 'constants/icons';
import Link from 'next/link';

const siderStyle: React.CSSProperties = {
    height: '914px',
    backgroundColor: 'white',
    position: 'fixed',
    zIndex: '99',
    top: '101px',
    width: '215px',
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(
        <Link href="/" rel="noopener noreferrer">
            Dashboard
        </Link>,
        'Dashboard',
        <DashboardIcon />
    ),
    getItem(
        <Link href="/campaign" rel="noopener noreferrer">
            Campaigns
        </Link>,
        'Campaigns',
        <CampaignIcon />
    ),
    getItem(
        <Link href="/report" rel="noopener noreferrer">
            Report
        </Link>,
        'Report',
        <ReportIcon />
    ),
    getItem(
        <Link href="/billing" rel="noopener noreferrer">
            Billing
        </Link>,
        'Billing',
        <BillingIcon />
    ),
];

const settings: MenuItem[] = [
    getItem(
        <Link href="/setting" rel="noopener noreferrer">
            Setting
        </Link>,
        'Setting',
        <SettingIcon />
    ),
    getItem(
        <Link href="/help-center" rel="noopener noreferrer">
            Help Centre
        </Link>,
        'Help Centre',
        <HelpIcon />
    ),
    getItem(
        <Link href="#" rel="noopener noreferrer">
            Logout
        </Link>,
        'Logout',
        <LogOutIcon />
    ),
];

export default function SideBar() {
    return (
        <>
            <Sider className="drop-shadow-md" style={siderStyle}>
                <div className="flex flex-col px-5">
                    <div className="mt-[40px] text-2sm font-[600] text-gray-450">
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['menu1']}
                            items={items}
                        />
                    </div>
                    <div className="mt-[279px] border-t-2 text-2sm font-[600] text-[#999999]  ">
                        <Menu
                            defaultSelectedKeys={['2']}
                            defaultOpenKeys={['menu2']}
                            items={settings}
                        />
                    </div>
                </div>
            </Sider>
        </>
    );
}
