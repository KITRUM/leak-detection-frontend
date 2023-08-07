import { HomeIcon, MapIcon, GiftIcon } from "@heroicons/react/20/solid";
import NavLink from "@/elements/NavLink";

const SideNavigation = () => {
  return (
    <div>
      <nav className="h-full p-6 pt-20 flex flex-col bg-primary-black">
        <NavLink name="Dashboard" slug="/" icon={<HomeIcon />} />
        <NavLink name="Platforms" slug="/platforms" icon={<MapIcon />} />
        <NavLink name="About" slug="/about" icon={<GiftIcon />} />
      </nav>
    </div>
  );
};

export default SideNavigation;
