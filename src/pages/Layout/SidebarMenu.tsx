import { GetProp, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { IUser } from "../../utils/type";
import { roleRoutesMap } from "../../routes/routesConfig";
type MenuItem = GetProp<MenuProps, "items">[number];
const SidebarMenu = ({ user }: { user: IUser }) => {
  const listOfRoutes = roleRoutesMap[user?.tag] || [];
  const items: MenuItem[] = listOfRoutes
    .filter((route) => route.title)
    .map((route, index) => {
      if (route.children && route.children.length > 0) {
        const visibleChildren = route.children.filter((c) => c.showInMenu);

        if (visibleChildren.length > 0) {
          return {
            key: String(index + 1),
            icon: route.icon,
            label: route.title,
            children: visibleChildren.map((child, cIndex) => ({
              key: `${index + 1}-${cIndex + 1}`,
              label: (
                <Link to={`${route.path}/${child.path}`}>
                  {child.path.charAt(0).toUpperCase() +
                    child.path.replace("-", " ").slice(1)}
                </Link>
              ),
            })),
          };
        }
      }

      return {
        key: String(index + 1),
        icon: route.icon,
        label: <Link to={`${route.path}`}>{route.title}</Link>,
      };
    });

  return <Menu mode="inline" items={items} theme="dark" />;
};

export default SidebarMenu;
