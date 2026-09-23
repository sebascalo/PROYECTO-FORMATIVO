import FormCreationVacunation from "@/components/vacunation/formCreationVacunation";
import TableVacunation from "@/components/vacunation/tableVacunation";


function VacunationPage() {
     return (
         <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      {/* Botón de creacion*/}
      <div className="flex justify-end w-full">
        <FormCreationVacunation />
      </div>

      {/* Tabla */}
      <div className="flex justify-center w-full">
        <div className="w-full">
          <TableVacunation />
        </div>
      </div>
    </div>
    );
}

export default VacunationPage;