import AnimatedPhotoGrid from '@/app/components/AnimatedPhotoGrid';
import Pagination from '@/app/components/Pagination';
import {sql} from '@vercel/postgres';
import {QueryResult} from 'pg';

export type Photo = {
  id: string;
  file_url: string;
  caption: string;
  created_at: string;
};

const ITEMS_PER_PAGE = 8;

export default async function PhotoGrid({
  page = 1,
}: {
  page?: number;
}) {
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const { rows } = (await sql`
    SELECT * FROM images 
    ORDER BY created_at DESC 
    LIMIT ${ITEMS_PER_PAGE} 
    OFFSET ${offset}
  `) as QueryResult<Photo>;

  const {
    rows: [{ count }],
  } = await sql`
    SELECT COUNT(*) FROM images
  `;

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-grow'>
        <AnimatedPhotoGrid images={rows} />
      </div>
      {totalPages > 1 && (
        <div className='sticky bottom-0 w-full bg-zinc-950 py-4'>
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
