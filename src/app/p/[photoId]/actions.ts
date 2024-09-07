import fs from 'fs';

export async function generateImage(image: string, prompt: string) {
  const formData = new FormData();

  const blob = await fetch(image).then((r) => r.blob());

  formData.append('image', blob);
  formData.append('prompt', prompt);
  formData.append('control_strength', '0.6');
  formData.append('output_format', 'webp');

  const response = await fetch(
    'https://api.stability.ai/v2beta/stable-image/control/structure',
    {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer sk-J5b4uKHDrh6fYDllRniAJaz5jxzPVkcwhtM7Kx9uWgtbBAiR`,
        Accept: 'image/*',
      },
    },
  );

  if (response.ok) {
    const arrayBuffer = await response.arrayBuffer();
    fs.writeFileSync('./chicken-portrait.webp', Buffer.from(arrayBuffer));
  } else {
    throw new Error(`${response.status}: ${await response.text()}`);
  }
}
