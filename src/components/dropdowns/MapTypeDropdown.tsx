import type { Dispatch, SetStateAction } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Props = Readonly<{
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
}>;

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-full xs:w-[180px]">
        <SelectValue placeholder="Map Style" />
      </SelectTrigger>

      <SelectContent className="z-1001">
        {types.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const types = [
  {
    value: "streets-v2",
    label: "Streets",
  },
  {
    value: "satellite",
    label: "Satellite",
  },
  {
    value: "hybrid",
    label: "Hybrid",
  },
  {
    value: "outdoor-v2",
    label: "Outdoor",
  },
];
