type Props = {
  params: {
    photoId: string;
  };
};

export default function PhotoPage({ params }: Props) {
  return <div>This is photo {params.photoId}</div>;
}
