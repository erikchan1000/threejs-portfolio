'use client';

import { Suspense } from 'react';
import Floor from './Floor';
import Environment from './Environment';
import Room from './Room';

function Fallback() {
  return null;
}

export default function World() {
  return (
    <Suspense fallback={<Fallback />}>
      <Environment />
      <Floor />
      <Room />
    </Suspense>
  );
}
