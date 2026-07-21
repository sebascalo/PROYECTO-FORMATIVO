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
            <DialogContent className="text-fond bg-gradient-nav hover:none sm:max-w-sm">
              <DialogHeader>
                <DialogTitle className="font-bold text-center hover:none">Ingreso</DialogTitle>
                <DialogDescription className="text-fond hover:none">
                  Ingrese sus credenciales para acceder al sistema.
                </DialogDescription>
              </DialogHeader>
            <FieldGroup>
            <Field>
              <Label htmlFor="usuario" className="font-bold">Ususario</Label>
              <Input id="usuario" name="usuario" placeholder="*****@gmail.com" className="bg-white text-black placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-blue-500"/>
            </Field>
            <Field>
              <Label htmlFor="contraseña" className="font-bold">Contraseña</Label>
              <Input id="contraseña" name="contraseña" placeholder="********" className="bg-white text-black placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-blue-500"/>
              <ResetPassword onClick={() => setOpenDialog(true)} Textbutton="¿Olvidaste tu contraseña?" style="cursor-pointer text-sm text-gray-300 hover:text-blue-700 mt-2"/>
            </Field>
            </FieldGroup>
          <DialogFooter>
            <Button type="submit" className="cursor-pointer w-full bg-blue-900 hover:bg-white hover:text-black">Iniciar sesión</Button>
          </DialogFooter>
        </DialogContent>
          </form>
    </Dialog>
    </div>
  );
}