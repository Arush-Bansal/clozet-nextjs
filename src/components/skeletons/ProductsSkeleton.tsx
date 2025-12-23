
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const ProductsSkeleton = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48 rounded-lg" />
          <Skeleton className="h-5 w-96 rounded-md" />
        </div>
        <div className="flex gap-3">
            <Skeleton className="h-11 w-32 rounded-xl" />
            <Skeleton className="h-11 w-32 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden border-none shadow-sm">
              <Skeleton className="aspect-square w-full bg-gray-100" />
              <CardHeader className="p-3 sm:p-4 pb-0 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                  <Skeleton className="h-4 sm:h-6 flex-1 rounded-md" />
                  <Skeleton className="h-4 sm:h-6 w-12 sm:w-16 rounded-md" />
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-3 sm:pt-4 flex items-center justify-between border-t border-gray-50 mt-3 sm:mt-4">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Skeleton className="h-4 w-8 sm:h-6 sm:w-10 rounded-full" />
                  <Skeleton className="h-3 w-8 sm:h-4 sm:w-12 rounded-md" />
                </div>
                <div className="flex gap-0.5 sm:gap-1">
                  <Skeleton className="h-7 w-7 sm:h-9 sm:w-9 rounded-md" />
                  <Skeleton className="h-7 w-7 sm:h-9 sm:w-9 rounded-md" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};
