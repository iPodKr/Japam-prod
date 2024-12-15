import { cn } from "@/shared/lib/utils";
import { Product } from "@prisma/client";

interface Props {
  name: string;
  description: string;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, description, className }) => {


  return (
    <div>
      <div className={cn("flex items-center justify-between", className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      <p className="text-xs text-gray-400 w-[90%]">{description}</p>
    </div>
  );
};