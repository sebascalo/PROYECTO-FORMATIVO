import FormCreationFood from "@/components/food/formCreationFood";
import TableFood from "@/components/food/tableFood";


function FoodPage() {
     return (
         <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      {/* Botón de creacion*/}
      <div className="flex justify-end w-full">
        <FormCreationFood />
      </div>

      {/* Tabla */}
      <div className="flex justify-center w-full">
        <div className="w-full">
          <TableFood />
        </div>
      </div>
    </div>
    );
}

export default FoodPage;