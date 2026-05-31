import SideCardSkeleton from "./SideCardSkeleton";
import { Skeleton } from "../ui/skeleton";

const skeletonKeys = ["air-pollution-card-1", "air-pollution-card-2", "air-pollution-card-3", "air-pollution-card-4", "air-pollution-card-5", "air-pollution-card-6", "air-pollution-card-7", "air-pollution-card-8"] as const;

export default function SidePanelSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Air Pollution</h1>

      <Skeleton className="size-12" />

      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">AQI</h1>
      </div>

      {skeletonKeys.map((key) => (
        <SideCardSkeleton key={key} />
      ))}
    </div>
  );
}
