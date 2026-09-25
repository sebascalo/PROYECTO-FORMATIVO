"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ResetPasswordProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ResetPassword({ open, onOpenChange }: ResetPasswordProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black sm:max-w-sm p-6">
        {/* ❌ Botón de cerrar en la esquina superior derecha */}
        <button
          type="button"
          onClick={() => onOpenChange?.(false)}
          className="absolute top-3 right-3 rounded-sm text-gray-500 hover:text-black focus:outline-none"
          aria-label="Cerrar"
        >
        </button>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="font-bold text-center text-black">
              Restablecer Contraseña
            </DialogTitle>
            <DialogDescription className="text-black text-center">
              Ingrese su correo electrónico para recuperar su contraseña.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="pt-2">
            <Field>
              <Label htmlFor="usuario" className="font-bold">
                Usuario
              </Label>
              <Input
                id="usuario"
                name="usuario"
                placeholder="*****@gmail.com"
                className="bg-white text-black placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-blue-500"
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className="cursor-pointer w-full bg-green-500 hover:bg-green-600 hover:text-white"
            >
              Restablecer Contraseña
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}