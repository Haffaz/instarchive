import { put } from '@vercel/blob';
import axios from 'axios';
import { HTMLElement, parse } from 'node-html-parser';

export async function uploadPhoto(photoUrl: string) {
  const response = await fetch(photoUrl);
  const blob = await response.blob();
  const filename = `instagram_${Date.now()}.jpg`;

  const { url } = await put(filename, blob, { access: 'public' });

  return url;
}

export async function getPostData(postUrl: string) {
  const fullUrl = `${postUrl}embed/captioned`;
  const { data } = await axios.get(fullUrl);
  const root = parse(data);

  const photoUrl = getPhotoUrl(root);
  const caption = getPostCaption(root);

  return { photoUrl, caption };
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
