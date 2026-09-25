import { forwardRef } from "react";
import { CirclePlus } from "lucide-react";

interface ButtonCreateProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ButtonCreate = forwardRef<HTMLButtonElement, ButtonCreateProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:ring-offset-2 cursor-pointer ${className}`}
        {...props}
      >
        <CirclePlus className="w-5 h-5 mr-2" />
        {children}
      </button>
    );
  },
);

ButtonCreate.displayName = "ButtonCreate";

export default ButtonCreate;