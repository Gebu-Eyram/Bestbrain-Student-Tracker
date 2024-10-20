import ComingSoonPage from "@/components/custom/sections/ComingSoonPage";
import ExaminationsDashboard from "@/components/custom/sections/examinations/ExamPage";
import React from "react";
export const revalidate = 900;

const Examinations = () => {
  return (
    <div>
      <ExaminationsDashboard />
    </div>
  );
};

export default Examinations;
