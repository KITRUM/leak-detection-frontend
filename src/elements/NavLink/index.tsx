import { Link, useLocation } from "react-router-dom";
import React, { ReactNode, useEffect, useState } from "react";

type TNavLink = {
  name: string;
  slug: string;
  icon: ReactNode;
};

const NavLink: React.FC<TNavLink> = ({ name, slug, icon }) => {
  const [path, setPath] = useState("");
  const location = useLocation();

  useEffect(() => {
    setPath(window.location.pathname);
  }, [location]);

  const atPage = path === slug;

  const linkStyles = atPage
    ? "bg-primary-blue text-white before:absolute before:left-[0px] before:inset-y-1.5 before:bg-white before:w-1.5 before:h-9 before:rounded"
    : "hover:text-primary-blue text-gray-400";

  return (
    <Link
      to={slug}
      className={`relative flex px-6 py-3 gap-2 rounded fontSize-base ${linkStyles}`}
    >
      <div className="w-6 h-6">{icon}</div>
      {name}
    </Link>
  );
};

export default NavLink;
