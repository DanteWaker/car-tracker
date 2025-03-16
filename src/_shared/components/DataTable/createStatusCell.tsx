import { cn } from "@/_shared/lib/utils";

export const createStatusCell = (value: string, options?: { 
  newStatus?: string, 
  newColor?: string,
  closedStatus?: string,
  closedColor?: string
}) => {
  const isNew = value === (options?.newStatus || "Novo");
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium",
        isNew
          ? options?.newColor || "bg-blue-100 text-blue-800"
          : options?.closedColor || "bg-green-100 text-green-800"
      )}
    >
      {value}
    </span>
  );
}; 