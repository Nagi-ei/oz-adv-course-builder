'use client';

import { useParams, useRouter } from 'next/navigation';

export default function PlaceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const placeId = params.id;

  const handleViewOnMap = () => {
    router.push(`/map?placeId=${placeId}`);
  };

  return (
    <div className='p-4'>
      {/* Place details content */}
      <button
        onClick={handleViewOnMap}
        className='mt-4 px-4 py-2 bg-primary text-white rounded-lg'
      >
        View on Map
      </button>
    </div>
  );
}
