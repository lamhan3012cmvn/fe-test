import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import useDashboardLayout from "./DashboardLayout.hook";
import UserLogged from "./UserLogged/UserLogged.view";
const { Header, Sider, Content } = Layout;

type Props = {
  children: any;
};

const DashboardLayout = (props: Props) => {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { listMenu } = useDashboardLayout();

  return (
    <Layout className="min-h-screen">
      <Sider
        theme="light"
        className="border-r-1 shadow-md"
        trigger={null}
        width={250}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed) => {
          setCollapsed(collapsed);
        }}
      >
        <div className="bg-white w-full h-full">
          <div className="h-14 flex items-center justify-center px-2">CMS</div>
          <div>
            <div className="pl-4 mb-2">Menu</div>
            <Menu mode="inline" defaultSelectedKeys={["4"]} items={listMenu} />
          </div>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header
          className={"p-3 md:py-4 md:px-6 lg:py-5 lg:px-12"}
          style={{ background: colorBgContainer }}
        >
          <div className="flex justify-between items-center h-full">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger w-[20px] h-[20px] text-[20px] shrink-0",
                //   size: 28,
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <div className="w-full flex justify-end items-center">
              <UserLogged />
            </div>
          </div>
        </Header>
        <Content>
          <div className="p-6">
            <div className="w-full bg-white p-5 rounded-md">{children}</div>
          </div>
        </Content>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
