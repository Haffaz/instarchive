import { put } from '@vercel/blob';
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { parse } from 'node-html-parser';

export async function uploadPhoto(photoUrl: string): Promise<void> {
  try {
    const response = await fetch(photoUrl);
    const blob = await response.blob();
    const filename = `instagram_${Date.now()}.jpg`;

    const { url } = await put(filename, blob, { access: 'public' });

    revalidatePath('/');
    console.info('File uploaded to:', url);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

export async function getPhotoUrl(postUrl: string): Promise<string | undefined> {
  const fullUrl = `${postUrl}embed/captioned`;

  try {
    const { data } = await axios.get(fullUrl);
    const root = parse(data);

    const imgElement = root.querySelector('img.EmbeddedMediaImage');
    const link = imgElement?.getAttribute('src');

    return link?.replace(/&amp;/g, '&');
  } catch (error) {
    console.error('Error fetching photo url:', error);
    return undefined;
  }
}
