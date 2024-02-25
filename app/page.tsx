import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import { collections } from './services/database.services';
import Game from './models/game';
import { connectToDB } from './services/database.services';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Start Playing!',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/hangman.png`,
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/start-game`,
});

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'Hello Casters',
  openGraph: {
    title: 'Welcome',
    description: 'Hello Casters',
    images: [`${NEXT_PUBLIC_URL}/hangman.png`],
  },
  other: {
    ...frameMetadata,
  },
};

connectToDB()
  .then(() => {
    return collections.games?.count();
  })
  .then((res) => {
    console.log(res);
  });

export default function Page() {
  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}
