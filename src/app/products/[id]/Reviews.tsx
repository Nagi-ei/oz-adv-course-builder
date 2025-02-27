import { Review } from '@/app/types/products';
import { User, Star } from 'lucide-react';

export default function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className='pt-4 pb-12'>
      <h2 className='text-lg font-bold mb-2'>Reviews</h2>
      <ul className='flex flex-col gap-2'>
        {reviews.map((review) => (
          <li key={review.reviewerEmail} className='border-b p-2 pb-4'>
            <div className='flex gap-2 items-center'>
              <User className='inline-block mr-1 w-3 h-3' />
              <span className='text-sm font-bold'>{review.reviewerName}</span>
              <span className='text-xs text-gray-500 flex-grow text-right'>
                {review.date}
              </span>
            </div>
            <span className='text-xs text-gray-500'>
              {review.reviewerEmail}
            </span>
            <span className='flex gap-1 items-center py-2'>
              <Star className='inline-block mr-1 w-3 h-3' />
              {review.rating}
            </span>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
