import React from "react";
import FieldCard from "@/elements/FieldCard/FieldCard";

type TCardList = {
  baseSlug: string;
  fields: {
    id: number;
    name: string;
  }[];
};

const FieldList: React.FC<TCardList> = ({ baseSlug, fields }) => {
  return (
    <div className="grid grid-cols-4 place-items-center gap-8 p-8">
      {fields.map((field) => {
        return <FieldCard key={field.id} field={field} baseSlug={baseSlug} />;
      })}
    </div>
  );
};

export default FieldList;
