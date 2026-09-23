import FormCreationTreatment from "@/components/treatment/formCreationTreatment";
import TableTreatment from "@/components/treatment/tableTreatment";


function TreatmentPage() {
     return (
         <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      {/* Botón de creacion*/}
      <div className="flex justify-end w-full">
        <FormCreationTreatment />
      </div>

      {/* Tabla */}
      <div className="flex justify-center w-full">
        <div className="w-full">
          <TableTreatment />
        </div>
      </div>
    </div>
    );
}

export default TreatmentPage;