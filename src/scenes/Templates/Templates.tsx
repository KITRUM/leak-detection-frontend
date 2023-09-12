import { getTemplatesForPlatform } from "@/services/templates";
import { useParams } from "react-router-dom";
import TemplateCardList from "@/components/TemplateCardList/TemplateCardList";
import { useEffect, useState } from "react";
import { TTemplate } from "@/types";
import LinkButton from "@/elements/LinkButton/LinkButton";
import EmptySceneMessage from "@/elements/EmptySceneMessage";

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
      <div className="flex justify-between py-2 px-4">
        <h1 className="block pt-5 text-xl leading-4 text-text-gray-300 min-w-0">
          Templates
        </h1>
        <LinkButton
          name="Create template"
          slug={`/platforms/${platformId}/create-template`}
        />
      </div>
      {!templates && <EmptySceneMessage message="No templates loaded" />}
      {templates && (
        <TemplateCardList baseSlug="/templates/" templates={templates} />
      )}
    </>
  );
};

export default Templates;
