import FormCreationMount from "@/components/mount/formCreationMount";
import TableMount from "@/components/mount/tableMount";


function MountPage() {
     return (
         <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      {/* Botón de creacion*/}
      <div className="flex justify-end w-full">
        <FormCreationMount />
      </div>

      {/* Tabla */}
      <div className="flex justify-center w-full">
        <div className="w-full">
          <TableMount />
        </div>
      </div>
    </div>
    );
}

export default MountPage;