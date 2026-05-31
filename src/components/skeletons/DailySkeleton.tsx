import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const skeletonKeys = ["daily-forecast-mon", "daily-forecast-tue", "daily-forecast-wed", "daily-forecast-thu", "daily-forecast-fri", "daily-forecast-sat", "daily-forecast-sun", "daily-forecast-next"] as const;

export default function DailySkeleton() {
  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4 2xl:justify-between">
      {skeletonKeys.map((key) => (
        <div key={key} className="flex justify-between">
          <Skeleton className="h-8 w-9" />
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8" />
          <Skeleton className="size-8" />
          <Skeleton className="size-8" />
        </div>
      ))}
    </Card>
  );
}
