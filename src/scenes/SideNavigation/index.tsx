import { HomeIcon, MapIcon, GiftIcon } from "@heroicons/react/20/solid";
import NavLink from "@/elements/NavLink/NavLink";
import logo from "/logo.svg";

const SideNavigation = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <nav className="h-full p-6 pt-20 flex flex-col bg-primary-black">
        <NavLink name="Dashboard" slug="/" icon={<HomeIcon />} />
        <NavLink name="Platforms" slug="/platforms" icon={<MapIcon />} />
        <NavLink name="About" slug="/about" icon={<GiftIcon />} />
      </nav>
      <div className="">
        <img src={logo} alt="Franatech logo" />
      </div>
    </div>
  );
};

export default SideNavigation;
