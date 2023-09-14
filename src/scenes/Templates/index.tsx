import { getTemplatesForPlatform } from "@/services/templates";
import { useParams } from "react-router-dom";
import TemplateCardList from "@/components/TemplateCardList/TemplateCardList";
import { useEffect, useState } from "react";
import { TTemplate } from "@/types";
import LinkButton from "@/elements/LinkButton/LinkButton";
import EmptySceneMessage from "@/elements/EmptySceneMessage";
import { Maybe } from "yup";

const Templates = () => {
  const [templates, setTemplates] = useState<TTemplate[] | []>([]);
  const { platformId } = useParams<string>();

  useEffect(() => {
    const fetchTemplates = async () => {
      if (platformId) {
        const templatesData: Maybe<TTemplate[]> = await getTemplatesForPlatform(
          +platformId
        );

        if (templatesData) {
          setTemplates(templatesData);
        }
      }
    };

    fetchTemplates();
  }, []);

  return (
    <>
      <div className="flex justify-between py-2 px-4">
        <LinkButton
          name="Create template"
          slug={`/platforms/${platformId}/create-template`}
        />
      </div>
      {templates ? (
        <TemplateCardList baseSlug="/templates/" templates={templates} />
      ) : (
        <EmptySceneMessage message="No templates are added yet" />
      )}
    </>
  );
};

export default Templates;
