import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Start Playing!',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/park-1.png`,
    aspectRatio: '1:1',
  },
  input: {
    text: 'Letter',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'Hello Casters',
  openGraph: {
    title: 'Welcome',
    description: 'Hello Casters',
    images: [`${NEXT_PUBLIC_URL}/cover.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}
