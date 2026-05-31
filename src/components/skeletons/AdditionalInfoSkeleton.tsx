import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const skeletonKeys = ["additional-info-clouds", "additional-info-uv", "additional-info-wind", "additional-info-pressure", "additional-info-sunrise", "additional-info-sunset"] as const;

export default function AdditionalInfoSkeleton() {
  return (
    <Card title="Additional Weather Info" childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8">
      {skeletonKeys.map((key) => (
        <div key={key} className="flex justify-between">
          <div className="flex gap-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="size-8 rounded-full" />
          </div>

          <Skeleton className="size-8" />
        </div>
      ))}
    </Card>
  );
}
