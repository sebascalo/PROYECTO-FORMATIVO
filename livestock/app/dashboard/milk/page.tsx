import FormCreationMilk from "@/components/milk/formCreationMilk";
import TableMilk from "@/components/milk/tableMilk";

function MilkPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      {/* Botón de creacion*/}
      <div className="flex justify-end w-full">
        <FormCreationMilk />
      </div>

      {/* Tabla */}
      <div className="flex justify-center w-full">
        <div className="w-full">
          <TableMilk />
        </div>
      </div>
    </div>
  );
}

export default MilkPage;