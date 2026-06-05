import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function AIWeatherSkeleton() {
  return (
    <Card title="AI Weather Assistant" childrenClassName="grid gap-4 md:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div key={item} className="rounded-xl border p-4 flex flex-col gap-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </Card>
  );
}
