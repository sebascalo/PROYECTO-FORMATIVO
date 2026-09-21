"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ResetPassword from "@/components/auth/ResetPassword";
import { useState } from "react";

interface LoginProps {
  Textbutton?: string;
  style?: string;
}

export default function Login({ Textbutton = "", style = "" }: LoginProps) {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
    <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
          <form>
            <DialogTrigger asChild>
              <Button className={style}>{Textbutton}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm bg-white text-black">
              <DialogHeader>
                <DialogTitle className="font-bold text-center text-black">Ingreso</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Ingrese sus credenciales para acceder al sistema.
                </DialogDescription>
              </DialogHeader>
            <FieldGroup>
            <Field>
              <Label htmlFor="usuario" className="font-bold text-black">Usuario</Label>
              <Input id="usuario" name="usuario" placeholder="*****@gmail.com" className="bg-white text-black placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-blue-500"/>
            </Field>
            <Field>
              <Label htmlFor="contraseña" className="font-bold text-black">Contraseña</Label>
              <Input id="contraseña" name="contraseña" placeholder="********" className="bg-white text-black placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-blue-500"/>
              <ResetPassword onClick={() => setOpenDialog(true)} Textbutton="¿Olvidaste tu contraseña?" style="cursor-pointer text-sm text-gray-500 mt-2"/>
            </Field>
            </FieldGroup>
          <DialogFooter>
            <Button
              type="submit"
              className="cursor-pointer w-full bg-[#2B7FFF] text-white hover:bg-[#1E63CC] transition-colors duration-300"
            >
              Iniciar sesión
            </Button>
          </DialogFooter>
        </DialogContent>
          </form>
    </Dialog>
    </div>
  );
}