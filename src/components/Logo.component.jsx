import React from 'react';

export default function Logo() {
  return (
    <div className="flex relative h-16 w-48">
      <img
        src={'/Goshen-logo-with-name.jpeg'}
        alt="Goshen Logo with Name"
        height={200}
        width={200}
        loading="eager"
        className="absolute top-0 left-0 object-cover h-full w-full"
      />
    </div>
  );
}
