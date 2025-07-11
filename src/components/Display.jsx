import React, { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { albumsData } from '../assets/assets';

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes('album');
  const albumId = isAlbum ? location.pathname.split('/').pop() : '';
  const albumIndex = Number(albumId);

  const bgColor = (isAlbum && !isNaN(albumIndex) && albumsData[albumIndex])
    ? albumsData[albumIndex].bgColor
    : null;

  useEffect(() => {
    if (isAlbum && bgColor) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  }, [location.pathname]);

  return (
    <div
      ref={displayRef}
      className='w-full m-2 px-6 pt-4 rounded text-white overflow-auto lg:w-[75%] lg:ml-0'
    >
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
