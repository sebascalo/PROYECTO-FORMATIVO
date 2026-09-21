import FormCreationBovine from "@/components/cattle/formCreationBovine";
import TableBovine from "@/components/cattle/tableBovine";
// import {CirclePlus} from "lucide-react"

function CattlePage() {
     return (
        <div className="flex flex-col items-end  w-full h-full">
            {/* <button className="  justify-end align-end px-4 py-2 rounded mb-4">
                <CirclePlus className="w-8 h-8 mr-2 text-green-600" />
            </button> */}
            <FormCreationBovine />
           <TableBovine />
        </div>
    );
}

export default CattlePage;