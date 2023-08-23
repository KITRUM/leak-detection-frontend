import React from "react";
import TemplateCard from "@/components/TemplateCard/TemplateCard";

type TTemplateCardList = {
  baseSlug: string;
  templates: {
    id: number;
    name: string;
  }[];
};

const TemplateCardList: React.FC<TTemplateCardList> = ({
  baseSlug,
  templates,
}) => {
  return (
    <div className="grid grid-cols-4 place-items-center gap-8 p-8">
      {templates.map((template) => {
        return (
          <TemplateCard
            key={template.id}
            template={template}
            baseSlug={baseSlug}
          />
        );
      })}
    </div>
  );
};

export default TemplateCardList;
