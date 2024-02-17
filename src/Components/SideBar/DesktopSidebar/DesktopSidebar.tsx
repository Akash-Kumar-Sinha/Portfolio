import useRoutes from "../../../utils/Hooks/useRoutes";
import DesktopItem from "./DesktopItem";

const DesktopSidebar = () => {

  const routes = useRoutes();
  return (
    <div>
      <div
        className="
        hidden 
        lg:fixed
        lg;z-100
        lg:flex
        lg:flex-col
        items-center
        justify-center
    "
      > 
        <nav className="flex flex-col justify-between">
          <ul className="flex flex-col justify-center h-screen">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                label={item.label}
                href={item.href}
                icon={item.icon}
                active={item.active}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DesktopSidebar;
