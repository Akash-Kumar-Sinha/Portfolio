import MobileItem from "./MobileItem";
import useRoutes from "../../../utils/Hooks/useRoutes";

const MobileBar = () => {
  const routes = useRoutes();
  return (
    <div className="fixed left-0 top-0 h-full bg-[#F0F8FF] border-r-2  w-64">
      <nav className="flex flex-col">
        <ul className="flex flex-col pt-12">
          {routes.map((item) => (
            <MobileItem
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
  );
};

export default MobileBar;
