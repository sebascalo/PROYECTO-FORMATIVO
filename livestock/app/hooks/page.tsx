"use client"
import NavBar from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Hooks() {
    // estado contador
    const [count, setCount] = useState(1);

    // función para incrementar el contador 
    const increment = () => {
        setCount(count + 1);
    }

    const decrement = () => {
        setCount(count - 1);
    }

    const exponenciar = () => {
        setCount(count * count);
    }   

    const dividir = () => {
        setCount(count / count);
    }

    return (
        <>
            <NavBar/>
                <main className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-4xl font-bold mb-4">Hooks Page</h1>
                    
                    <div>
                        <h2>Click que llevas {count}</h2>
                        <Button onClick={decrement}>Decrement</Button>
                        <Button onClick={increment}>Increment</Button>
                        <Button onClick={exponenciar}>Exponenciar</Button>
                        <Button onClick={dividir}>Dividir</Button>
                    </div>

                </main>
        </> 
    )
}