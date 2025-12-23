
import { Skeleton } from "@/components/ui/skeleton";

export const UserProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-white shadow-sm" />
          <div className="flex justify-center items-center gap-2 mb-3">
             <Skeleton className="h-9 w-48 rounded-lg" />
          </div>
          <div className="flex justify-center items-center">
             <Skeleton className="h-5 w-32 rounded-md" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
            {/* Search and Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-2">
              <Skeleton className="h-8 w-48 rounded-lg" /> {/* Featured Collection */}
              <Skeleton className="h-10 w-full md:w-72 rounded-xl" /> {/* Search Input */}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8 px-2">
                 {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-8 w-20 rounded-full" />
                 ))}
            </div>
            
            {/* Grid */}
            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                        <Skeleton className="aspect-square w-full" />
                        <div className="p-4 space-y-2">
                            <Skeleton className="h-5 w-3/4 rounded-md" />
                            <Skeleton className="h-5 w-1/4 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
