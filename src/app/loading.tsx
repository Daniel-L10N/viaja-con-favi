function OfertaCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow animate-pulse">
      <div className="h-56 bg-gray-200" />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4" />
        <div className="h-4 bg-gray-200 rounded mb-4 w-full" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
        <div className="flex justify-between pt-4 border-t">
          <div className="h-8 w-20 bg-gray-200 rounded" />
          <div className="h-8 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-12 bg-gray-200 rounded-xl mt-4" />
      </div>
    </div>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-6">
        <div className="flex gap-2 mb-3">
          <div className="h-6 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
        <div className="h-5 bg-gray-200 rounded mb-2 w-3/4" />
        <div className="h-4 bg-gray-200 rounded mb-4 w-full" />
        <div className="flex justify-between pt-4 border-t">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
        <div className="h-10 border-2 border-gray-200 rounded-xl mt-4" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="h-12 bg-amber-400/30 rounded mb-4 w-3/4" />
            <div className="h-6 bg-amber-400/20 rounded w-1/2" />
          </div>
        </div>
      </div>

      {/* Ofertas skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-48" />
            <div className="h-6 bg-gray-200 rounded w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <OfertaCardSkeleton />
            <OfertaCardSkeleton />
            <OfertaCardSkeleton />
          </div>
        </div>
      </section>

      {/* Blog skeleton */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-48" />
            <div className="h-6 bg-gray-200 rounded w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </div>
        </div>
      </section>
    </div>
  );
}
