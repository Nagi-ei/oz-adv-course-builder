'use client';

import { useEffect, useState } from 'react';

export default function Map() {
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [position, setPosition] = useState<any>(null);

  useEffect(() => {
    let map: naver.maps.Map;
    const center: naver.maps.LatLng = new naver.maps.LatLng(
      37.3595704,
      127.105399
    );

    map = new naver.maps.Map('map', {
      center: center,
      zoom: 16,
    });

    setMap(map);

    const getSuccess = (position: object) => {
      console.log(position);
      setPosition(position);
    };

    const getError = () => {
      console.log('geolocation api error');
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000, // 5 s
      maximumAge: 60000, // 1 m
    };

    window.navigator.geolocation.getCurrentPosition(
      getSuccess,
      getError,
      options
    );
  }, []);

  const handleClick = () => {
    console.log(position.coords.latitude, position.coords.longitude);
    map?.setCenter(
      new naver.maps.LatLng(position.coords.latitude, position.coords.longitude)
    );
  };

  return (
    <>
      <div id='map' style={{ width: '100%', height: '400px' }}></div>
      <button onClick={handleClick} className='bg-zinc-300 p-2 rounded-md'>
        To Your Location
      </button>
    </>
  );
}
