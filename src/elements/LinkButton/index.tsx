import { Link } from "react-router-dom";
import React from "react";

type TLinkButton = {
  name: string;
  slug: string;
};

const LinkButton: React.FC<TLinkButton> = ({ name, slug }) => {
  return (
    <Link
      to={slug}
      className="flex items-center justify-center min-w-max px-4 py-2 rounded border border-transparent bg-primary-blue text-base text-white shadow-lg duration-300 hover:bg-white hover:text-primary-blue hover:border hover:border-primary-blue"
    >
      {name}
    </Link>
  );
};

export default LinkButton;
