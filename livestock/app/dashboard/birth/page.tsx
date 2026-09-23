import FormCreationBirth from "@/components/birth/formCreationBirth";
import TableBirth from "@/components/birth/tableBirth";
// import {CirclePlus} from "lucide-react"

function BirthPage() {
     return (
        <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      {/* Botón de creacion*/}
      <div className="flex justify-end w-full">
        <FormCreationBirth />
      </div>

      {/* Tabla */}
      <div className="flex justify-center w-full">
        <div className="w-full">
          <TableBirth />
        </div>
      </div>
    </div>
    );
}

export default BirthPage;