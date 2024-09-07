import AnimatedPhotoGrid from '@/app/components/AnimatedPhotoGrid';
import { sql } from '@vercel/postgres';
import { QueryResult } from 'pg';

export type Photo = {
  id: string;
  file_url: string;
  caption: string;
  created_at: string;
};

export default async function PhotoGrid() {
  const { rows } =
    (await sql`SELECT * FROM images ORDER BY created_at DESC`) as QueryResult<Photo>;

  return <AnimatedPhotoGrid images={rows} />;
}
