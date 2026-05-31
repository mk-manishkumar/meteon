import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const skeletonKeys = ["skeleton-mon", "skeleton-tue", "skeleton-wed", "skeleton-thu", "skeleton-fri"] as const;

export default function SideCardSkeleton() {
  return (
    <Card childrenClassName="flex flex-col gap-3" className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!">
      <div className="flex justify-between">
        <Skeleton className="h-7 w-12 dark:bg-sidebar" />
        <Skeleton className="h-7 w-12 dark:bg-sidebar" />
      </div>

      <Skeleton className="h-1.5 w-full dark:bg-sidebar" />

      <div className="flex justify-between text-xs">
        <Skeleton className="h-4 w-2 dark:bg-sidebar" />
        <Skeleton className="h-4 w-2 dark:bg-sidebar" />
      </div>

      <div className="flex justify-between">
        {skeletonKeys.map((key) => (
          <Skeleton key={key} className="h-6 w-15 dark:bg-sidebar" />
        ))}
      </div>
    </Card>
  );
}
