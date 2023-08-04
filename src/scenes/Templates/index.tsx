import { fetchTemplates } from "@/services/templates";
import { Template } from "@/types";
import { useParams } from "react-router-dom";
import CardList from "@/components/CardList/CardList";
import LinkButton from "../../elements/LinkButton";

// Templates retrieve component
const Templates = () => {
  const { platformId } = useParams<string>();
  const templates: Template[] = fetchTemplates(Number(platformId));

  return (
    <>
      <div className="flex justify-end p-4">
        <LinkButton
          name="Create template"
          slug={`/platforms/${platformId}/create-template`}
        />
      </div>
      <CardList baseSlug="/templates/" cards={templates} />
    </>
  );
};

export default Templates;
