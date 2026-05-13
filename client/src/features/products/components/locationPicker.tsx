import { cn } from "@/lib/utils";
import { MapPin, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";

type LocationPickerProps = {
  value: string;
  onChange: (val: string) => void;
};

type LocationGroupProps = {
  label: string;
  options: string[];
  current: string;
  onSelect: (value: string) => void;
};

function LocationPicker({ value, onChange }: LocationPickerProps) {
  const FLOORS = ["1", "2", "3"];
  const AREAS = ["1", "2", "3", "4", "5", "6"];
  const LEVELS = ["1", "2", "3", "4"];

  const parts = value ? value.split(":") : ["F1", "A1", "L1"];

  const updatePart = (prefix: "F" | "A" | "L", newVal: string) => {
    const newParts = [...parts];
    if (prefix === "F") newParts[0] = `F${newVal}`;
    if (prefix === "A") newParts[1] = `A${newVal}`;
    if (prefix === "L") newParts[2] = `L${newVal}`;
    onChange(newParts.join(":"));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="w-full h-10 rounded-xl text-[11px] font-bold bg-white border-none shadow-sm flex justify-between items-center px-3 hover:bg-slate-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <MapPin
              className={cn(
                "w-3.5 h-3.5",
                value ? "text-red-500" : "text-gray-300",
              )}
            />
            <span className={value ? "text-gray-900" : "text-gray-400"}>
              {value || "Set Location"}
            </span>
          </div>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-5 rounded-[24px] shadow-2xl border-none bg-white" align="start">
        <div className="space-y-5">
          <LocationGroup
            label="Floor"
            options={FLOORS}
            current={parts[0].slice(1)}
            onSelect={(v) => updatePart("F", v)}
          />
          <LocationGroup
            label="Area"
            options={AREAS}
            current={parts[1].slice(1)}
            onSelect={(v) => updatePart("A", v)}
          />
          <LocationGroup
            label="Level"
            options={LEVELS}
            current={parts[2].slice(1)}
            onSelect={(v) => updatePart("L", v)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

function LocationGroup({ label, options, current, onSelect }: LocationGroupProps) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt: string) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={cn(
              "h-8 min-w-[36px] px-2 rounded-lg text-[11px] font-bold transition-all border",
              current === opt
                ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-100"
                : "bg-slate-50 text-gray-600 border-slate-100 hover:bg-slate-100",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export { LocationPicker }
