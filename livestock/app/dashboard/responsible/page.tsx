import FormCreationResponsible from "@/components/responsible/formCreationResponsible";
import TableResponsible from "@/components/responsible/tableResponsible";
// import {CirclePlus} from "lucide-react"

function ResponsiblePage() {
     return (
         <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      {/* Botón de creacion*/}
      <div className="flex justify-end w-full">
        <FormCreationResponsible/>
      </div>

      {/* Tabla */}
      <div className="flex justify-center w-full">
        <div className="w-full">
          <TableResponsible/>
        </div>
      </div>
    </div>
    );
}

export default ResponsiblePage;