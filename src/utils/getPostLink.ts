import axios from 'axios';
import { parse } from 'node-html-parser';

export async function getPostLink(url: string) {
  const fullUrl = `${url}embed/captioned`;

  try {
    const response = await axios.get(fullUrl);
    const root = parse(response.data);

    let link = root
      .querySelector('img.EmbeddedMediaImage')
      ?.getAttribute('src');

    if (link) {
      link = link.replace(/&amp;/g, '&');
    }

    const caption = await getCaptionFromHtml(response.data);

    return { link, caption };
  } catch (error) {
    console.error('Error fetching post link:', error);
    return { link: undefined, caption: 'Error fetching post' };
  }
}

async function getCaptionFromHtml(html: string) {
  const root = parse(html);

  let caption = root.querySelector('.Caption')?.text ?? 'No caption';
  caption = caption.replace('view all comments', '').trim();
  return caption;
}
