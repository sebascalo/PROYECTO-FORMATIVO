import FormCreationWeighing from "@/components/weighing/formCreationWeighing";
import TableWeighing from "@/components/weighing/tableWeighing";

function WeighingPage() {
     return (
        <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      {/* Botón de creacion*/}
      <div className="flex justify-end w-full">
        <FormCreationWeighing/>
      </div>

      {/* Tabla */}
      <div className="flex justify-center w-full">
        <div className="w-full">
          <TableWeighing />
        </div>
      </div>
    </div>
    );
}

export default WeighingPage;