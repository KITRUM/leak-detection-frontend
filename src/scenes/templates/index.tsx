import { fetchTemplates } from "@/services/templates";
import { Template } from "@/types";
import { Link, useParams } from "react-router-dom";
import CardList from "@/components/CardList/CardList";

// Templates retrieve component
const Templates = () => {
  const { platformId } = useParams<string>();
  const templates: Template[] = fetchTemplates(Number(platformId));

  return (
    <>
      <div className="flex justify-end p-4">
        <Link
          to={`/platforms/${platformId}/create-template`}
          className=" min-w-max px-4 py-2 rounded-[1em] bg-[#eef1f5] text-center text-lg shadow-lg duration-300 hover:scale-[1.05] hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100"
        >
          Create template
        </Link>
      </div>
      <CardList baseSlug="/templates/" cards={templates} />
    </>
  );
};

export default Templates;
