import FormCreationArtificialInsemination from "@/components/artificialInsemination/formCreationArtificialInsemination";
import TableArtificialInsemination from "@/components/artificialInsemination/tableArtificialInsemination";

function ArtificialInseminationPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      {/* Botón de creacion*/}
      <div className="flex justify-end w-full">
        <FormCreationArtificialInsemination />
      </div>

      {/* Tabla */}
      <div className="flex justify-center w-full">
        <div className="w-full">
          <TableArtificialInsemination/>
        </div>
      </div>
    </div>
  );
}

export default ArtificialInseminationPage;