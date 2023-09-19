import { Field } from "@/types";
import { useState } from "react";
import { fetchFields } from "@/services/fields";
import FieldList from "@/components/FieldList/FieldList";
import EmptySceneMessage from "@/elements/EmptySceneMessage";

const Fields = () => {
  const [fields] = useState<Field[]>(() => fetchFields());

  return (
    <>
      <div className="flex justify-between min-h-[58px] py-2 px-4"></div>
      {fields.length === 0 ? (
        <EmptySceneMessage message="No sensors are loaded" />
      ) : (
        <FieldList baseSlug="/fields/" fields={fields} />
      )}
    </>
  );
};

export default Fields;
