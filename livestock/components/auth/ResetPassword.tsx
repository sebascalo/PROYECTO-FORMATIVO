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

interface ResetPasswordProps {
  Textbutton?: string;
  style?: string;
  onClick?: () => void;
}

export default function ResetPassword(props:ResetPasswordProps) {

  return (
    <div>
    <Dialog>
          <form>
            <DialogTrigger asChild>
              <a onClick={props.onClick} className={props.style}>{props.Textbutton}</a>
            </DialogTrigger>
            <DialogContent className="text-white bg-gradient-to-r from-blue-500 to-blue-700 sm:max-w-sm">
              <DialogHeader>
                <DialogTitle className="font-bold text-center">Restablecer Contraseña</DialogTitle>
                <DialogDescription className="text-white">
                  Ingrese su correo electrónico para recuperar su contraseña.
                </DialogDescription>
              </DialogHeader>
            <FieldGroup>
            <Field>
              <Label htmlFor="usuario" className="font-bold">Ususario</Label>
              <Input id="usuario" name="usuario" placeholder="*****@gmail.com" className="bg-white text-black placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-blue-500"/>
            </Field>
            </FieldGroup>
          <DialogFooter>
            <Button type="submit" className="cursor-pointer w-full bg-green-500 hover:bg-green-600 hover:text-white">Restablecer Contraseña</Button>
          </DialogFooter>
        </DialogContent>
          </form>
    </Dialog>
    </div>
  );
}