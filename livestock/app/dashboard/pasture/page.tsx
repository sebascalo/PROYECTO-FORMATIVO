import FormCreationPasture from "@/components/pasture/formCreationPasture";
import TablePasture from "@/components/pasture/tablePasture";

function PasturePage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      {/* Botón de creacion*/}
      <div className="flex justify-end w-full">
        <FormCreationPasture />
      </div>

      {/* Tabla */}
      <div className="flex justify-center w-full">
        <div className="w-full">
          <TablePasture />
        </div>
      </div>
    </div>
  );
}

export default PasturePage;