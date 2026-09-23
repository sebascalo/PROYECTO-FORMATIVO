import TableMortality from "@/components/mortality/tableMortality";
import FormCreationMortality from "@/components/mortality/formCreationMortality";
// import {CirclePlus} from "lucide-react"

function MortalityPage() {
     return (
         <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      {/* Botón de creacion*/}
      <div className="flex justify-end w-full">
        <FormCreationMortality />
      </div>

      {/* Tabla */}
      <div className="flex justify-center w-full">
        <div className="w-full">
          <TableMortality />
        </div>
      </div>
    </div>
    );
}

export default MortalityPage;