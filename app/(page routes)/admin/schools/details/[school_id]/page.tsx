import SchoolDetailsComps, {
  StudentTableAdmin,
} from "@/components/custom/sections/admin/SchoolDetailsComps";
import React from "react";

interface PageProps {
  params: {
    school_id: string;
  };
}

const page = (props: PageProps) => {
  return (
    <div className="flex w-full">
      <SchoolDetailsComps school_id={props.params.school_id} />
    </div>
  );
};

export default page;
