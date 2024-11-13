import LInkItem from "./LInkItem";
import useFetchLinks from "../../utils/Hooks/useFetchLinks";
import Loading from "../../utils/Loading";

const Link = () => {
  const { links, isLoading, error } = useFetchLinks();

  if (isLoading || error) {
    return <Loading />;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {links.map((link) => (
        <LInkItem key={link.name} {...link} />
      ))}
    </div>
  );
};

export default Link;
