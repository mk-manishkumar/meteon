import type { Dispatch, SetStateAction } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Props = Readonly<{
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}>;

export default function LocationDropdown({ location, setLocation }: Props) {
  return (
    <Select value={location} onValueChange={(value) => setLocation(value)}>
      <SelectTrigger className="w-full xs:w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        {location === "custom" && <SelectItem value="custom">Custom</SelectItem>}
        {locations.map((city) => (
          <SelectItem key={city} value={city}>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const locations = ["Patna", "Tokyo", "Seoul", "Dubai", "Mumbai", "London", "New York", "Paris", "Berlin", "Madrid", "Bangkok", "Lisbon"];
