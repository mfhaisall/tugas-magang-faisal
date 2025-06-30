import React from "react";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

const Student: React.FC = () => {
  return (
    <div className="space-y-6">
      <ComponentCard title="Semua Santri">
        <BasicTableOne />
      </ComponentCard>
    </div>
  );
};

export default Student;
