"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ResetPassword from "@/components/auth/ResetPassword";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "@/components/ui/toast"

interface LoginProps {
  Textbutton?: string;
  style?: string;
}

export default function Login({ Textbutton = "", style = "" }: LoginProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const router = useRouter();

  // agregadas para gregar el objeto de login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [eye, setEye] = useState(<EyeClosed />);
  const [typePassword, setTypePassword] = useState("password");

  const showPassword = () => {
    if (typePassword == "password") {
      setTypePassword("text");
      setEye(<Eye />);
    } else {
      setTypePassword("password");
      setEye(<EyeClosed />);
    }
  };


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.add({
        title: "Corregir",
        description: "Por favor, ingrese su correo electronico.",
        type: "error",
      });
      return;
    }
    if (!password) {
      toast.add({
        title: "Corregir",
        description: "Por favor, ingrese su contraseña.",
        type: "error",
      });
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          const token = data.info.token;
          localStorage.setItem("token", token);
          localStorage.setItem("userId", String(data.info.userId));
          toast.add({
            title: "Éxito",
            description: "Inicio de sesión exitoso.",
            type: "success",
          });
          setOpenDialog(false);
          router.push("/dashboard");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
        <form>
          <DialogTrigger asChild>
            <Button className={style}>{Textbutton}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm bg-white text-black">
            <DialogHeader>
              <DialogTitle className="font-bold text-center text-black">
                Ingreso
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Ingrese sus credenciales para acceder al sistema.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="usuario" className="font-bold text-black">
                  Usuario
                </Label>
                <Input
                  id="usuario"
                  name="usuario"
                  placeholder="*****@gmail.com"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white text-black placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-blue-500"
                />
              </Field>
              <Field>
                <Label htmlFor="contraseña" className="font-bold text-black">
                  Contraseña
                </Label>
                {/* Contenedor con el ojito dentro del input */}
                <div className="relative">
                  <Input
                    id="contraseña"
                    name="contraseña"
                    placeholder="********"
                    value={password}
                    type={typePassword}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white text-black placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={showPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    aria-label="Mostrar u ocultar contraseña"
                  >
                    {eye}
                  </button>
                </div>
                <div className="w-fit">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenDialog(false);
                      setOpenReset(true);
                    }}
                    className="cursor-pointer text-sm text-blue-400 hover:text-blue-600 hover:underline mt-2 transition-colors duration-200"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button
                type="submit"
                className="cursor-pointer w-full bg-[#2B7FFF] text-white hover:bg-[#1E63CC] transition-colors duration-300"
                onClick={handleLogin}
              >
                Iniciar sesión
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      <ResetPassword
        open={openReset}
        onOpenChange={setOpenReset}
        onCancel={() => {
          setOpenReset(false);
          setOpenDialog(true);
        }}
      />
    </div>
  );
}
