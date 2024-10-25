import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ShelfPage() {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.shelfReducer.items); // Ensure you're selecting the right state slice
  console.log('items is', items);
  
  useEffect(() => {
    dispatch({ type: 'FETCH_SHELF' });
  }, [dispatch]);

  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Shelf</h2>
      {items.map((item) => (
        <div key={item.id} className="shelf-item">
          <h3>{item.description}</h3>
          {item.image_url && <img src={item.image_url} alt={item.description} />}
        </div>
      ))}
    </div>
  );
}

export default ShelfPage;
