import { getTemplatesForPlatform } from "@/services/templates";
import { useParams } from "react-router-dom";
import CardList from "@/components/CardList/CardList";
import { useEffect, useState } from "react";
import { TTemplate } from "@/types";
import LinkButton from "@/elements/LinkButton/LinkButton";

const Templates = () => {
  const [templates, setTemplates] = useState<TTemplate[] | []>([]);
  const { platformId } = useParams<string>();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        if (platformId) {
          const templatesData = await getTemplatesForPlatform(+platformId);
          setTemplates(templatesData);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <>
      <div className="flex justify-end pt-4 px-4">
        <LinkButton
          name="Create template"
          slug={`/platforms/${platformId}/create-template`}
        />
      </div>
      {!templates && <div className="p-6">No templates for this platform</div>}
      {templates && <CardList baseSlug="/templates/" cards={templates} />}
    </>
  );
};

export default Templates;
