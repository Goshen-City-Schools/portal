import React from 'react';

export default function Logo() {
  return (
    <div className="flex relative h-20 w-20">
      <img
        src={'/Goshen-logo-trans.png'}
        alt="Goshen Logo with Name"
        height={200}
        width={200}
        loading="eager"
        className="absolute top-0 left-0 object-contain h-full w-full"
      />
    </div>
  );
}
