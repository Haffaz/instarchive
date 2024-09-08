import { put } from '@vercel/blob';

export async function generateImage(image: string, prompt: string) {
  const formData = new FormData();

  const blob = await fetch(image).then((r) => r.blob());

  formData.append('image', blob);
  formData.append('prompt', prompt);
  formData.append('output_format', 'jpeg');

  const response = await fetch(
    'https://api.stability.ai/v2beta/stable-image/control/structure',
    {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_AI_KEY}`,
        Accept: 'image/*',
      },
    },
  );

  if (response.ok) {
    const arrayBuffer = await response.arrayBuffer();
    const generatedBlob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    const filename = `generated_${Date.now()}.jpeg`;

    const { url } = await put(filename, generatedBlob, { access: 'public' });

    return url;
  } else {
    throw new Error(`${response.status}: ${await response.text()}`);
  }
}
