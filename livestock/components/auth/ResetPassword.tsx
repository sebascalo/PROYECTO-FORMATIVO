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
import React from "react";

interface ResetPasswordProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCancel?: () => void;
}

export default function ResetPassword({ 
  open,
  onOpenChange,
  onCancel,
}: ResetPasswordProps) {

  const [email, setEmail] = React.useState("");

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: email
    };

    fetch("http://localhost:3000/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert(data.message);
      } else {
        alert("No se pudo enviar el correo, intente nuevamente.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black sm:max-w-sm p-6">
        <button
          type="button"
          onClick={() => onOpenChange?.(false)}
          className="absolute top-3 right-3 rounded-sm text-gray-500 hover:text-black focus:outline-none"
          aria-label="Cerrar"
        ></button>

        <form onSubmit={handleResetPassword} className="space-y-4">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-black placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-blue-500"
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="pt-4 flex flex-row gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="cursor-pointer flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </Button>
            
            <Button
              type="submit"
              className="cursor-pointer flex-1 bg-[#2B7FFF] text-white hover:bg-[#1E63CC] hover:text-white"
            >
              Restablecer Contraseña
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
