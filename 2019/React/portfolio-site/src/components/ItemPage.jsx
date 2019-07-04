import React from 'react';

const ItemPage = ({ match }) => {
  const { params } = match;
  return (
    <div>
      <h1>A thing I&apos;ve done</h1>
      <p>This page is for the item with id of {params.id}</p>
    </div>
  );
};

export default ItemPage;
