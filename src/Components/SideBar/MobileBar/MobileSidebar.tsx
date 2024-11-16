import MobileItem from "./MobileItem";
import useRoutes from "../../../utils/Hooks/useRoutes";

const MobileSidebar = ({ handleClick }: { handleClick: (label: string) => void }) => {
  const routes = useRoutes();
  return (
    <div className="fixed left-0 top-0 h-full bg-[#F5F5F5] border-r-2 w-fit pr-10">
      <nav className="flex flex-col">
        <ul className="flex flex-col pt-12">
          {routes.map((item) => (
            <MobileItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              handleClick={() => handleClick(item.label)}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileSidebar;
