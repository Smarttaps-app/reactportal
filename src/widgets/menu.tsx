import { Button, Drawer, Flex, Menu, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
  { key: "home", label: "Home", href: "#" },
  { key: "about", label: "About Us", href: "#about" },
  { key: "services", label: "Services", href: "#services" },
  { key: "contact", label: "Contact", href: "#contact" },
];

export default function MegaMenuWithPlacement({
  openDrawer,
}: {
  openDrawer?: (open: any) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Flex align="center" justify="space-between" className="w-full px-4 py-2 bg-white shadow">
      <Typography.Title level={4} className="!mb-0">
        {import.meta.env.VITE_APP_NAME}
      </Typography.Title>
      <div className="hidden lg:flex gap-6">
        {menuItems.map((item) => (
          <Typography.Link key={item.key} href={item.href} className="font-medium text-gray-700">
            {item.label}
          </Typography.Link>
        ))}
        <Link to="/auth/login">Login</Link>
      </div>
      <Button
        className="lg:hidden"
        icon={<MenuOutlined />}
        type="text"
        onClick={() => {
          setOpen(true);
          openDrawer?.(true);
        }}
      />
      <Drawer open={open} onClose={() => setOpen(false)} placement="right" title="Menu">
        <Menu
          mode="inline"
          items={menuItems.map((item) => ({
            key: item.key,
            label: <a href={item.href}>{item.label}</a>,
          }))}
        />
      </Drawer>
    </Flex>
  );
}
