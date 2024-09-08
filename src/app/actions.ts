'use server';

import { put } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { HTMLElement, parse } from 'node-html-parser';

export async function handleAddPhotoAction(
  _: { message: string } | undefined,
  formData: FormData,
) {
  const postLink = formData.get('instagramLink');
  if (!postLink) return;

  const postData = await getPostData(postLink.toString());
  if (!postData) return { message: 'Unable to get post data' };

  const blobUrl = await uploadPhoto(postData.photoUrl);
  await sql`INSERT INTO images (post_url, file_url, caption) VALUES (${postLink.toString()}, ${blobUrl}, ${postData.caption})`;
  revalidatePath('/');
}

async function uploadPhoto(photoUrl: string) {
  const response = await fetch(photoUrl);
  const blob = await response.blob();
  const filename = `instagram_${Date.now()}.jpg`;

  const { url } = await put(filename, blob, { access: 'public' });

  return url;
}

async function getPostData(postUrl: string) {
  try {
    const url = new URL(postUrl);
    url.pathname = `${url.pathname.replace(/\/$/, '')}/${'embed/captioned'.replace(/^\//, '')}`;

    const fullUrl = url.toString();

    const { data } = await axios.get(fullUrl);
    const root = parse(data);

    const photoUrl = getPhotoUrl(root);
    const caption = getPostCaption(root);

    return { photoUrl, caption };
  } catch (e) {
    console.error('Unable to get post data', e);
  }
}

function getPhotoUrl(root: HTMLElement) {
  const link = root
    .querySelector('img.EmbeddedMediaImage')
    ?.getAttribute('src');

  if (!link) {
    throw new Error(`img.EmbeddedMediaImage element not found`);
  }

  return link.replace(/&amp;/g, '&');
}

function getPostCaption(root: HTMLElement) {
  const captionElement = root.querySelector('.Caption');
  if (!captionElement) {
    throw new Error(`.Caption element not found`);
  }
  captionElement.querySelector('.CaptionUsername')?.remove();
  captionElement.querySelector('.CaptionComments')?.remove();
  return captionElement.textContent.trim();
}
