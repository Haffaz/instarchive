'use client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='flex items-center justify-center space-x-6 mt-8'>
      <Link
        href={createPageURL(Math.max(1, currentPage - 1))}
        className={`flex items-center ${
          currentPage === 1
            ? 'text-zinc-600 cursor-not-allowed'
            : 'text-zinc-300 hover:text-zinc-100'
        }`}
      >
        <ChevronLeftIcon className='h-5 w-5 mr-1' />
        Previous
      </Link>
      <span className='text-zinc-300'>
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={createPageURL(Math.min(totalPages, currentPage + 1))}
        className={`flex items-center ${
          currentPage === totalPages
            ? 'text-zinc-600 cursor-not-allowed'
            : 'text-zinc-300 hover:text-zinc-100'
        }`}
      >
        Next
        <ChevronRightIcon className='h-5 w-5 ml-1' />
      </Link>
    </div>
  );
}
