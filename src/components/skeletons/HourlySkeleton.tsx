import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const skeletonKeys = Array.from({ length: 48 }, (_, i) => `hourly-forecast-${i + 1}`);

export default function HourlySkeleton() {
  return (
    <Card title="Hourly Forecast (48 Hours)" childrenClassName="flex gap-6 overflow-x-scroll">
      {skeletonKeys.map((key) => (
        <div key={key} className="flex flex-col items-center gap-2 p-2 2xl:justify-between">
          <Skeleton className="h-6 w-15 2xl:scale-110" />
          <Skeleton className="size-8 rounded-full 2xl:size-10" />
          <Skeleton className="h-6 w-8 2xl:scale-110" />
        </div>
      ))}
    </Card>
  );
}
