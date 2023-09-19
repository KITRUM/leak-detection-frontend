import { getTemplatesForField } from "@/services/templates";
import { useParams } from "react-router-dom";
import TemplateCardList from "@/components/TemplateCardList/TemplateCardList";
import { useEffect, useState } from "react";
import { TTemplate } from "@/types";
import LinkButton from "@/elements/LinkButton/LinkButton";
import EmptySceneMessage from "@/elements/EmptySceneMessage";
import { Maybe } from "yup";

const Templates = () => {
  const [templates, setTemplates] = useState<TTemplate[] | []>([]);
  const { fieldId } = useParams<string>();

  useEffect(() => {
    const fetchTemplates = async () => {
      if (fieldId) {
        const templatesData: Maybe<TTemplate[]> = await getTemplatesForField(
          +fieldId
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
          slug={`/fields/${fieldId}/create-template`}
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
