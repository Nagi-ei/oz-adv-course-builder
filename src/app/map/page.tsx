'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMapCenter, setZoomLevel } from '../../lib/mapSlice';
import { RootState } from '../../lib/store';

declare global {
  interface Window {
    naver: any;
  }
}

export default function Map() {
  // const mapRef = useRef<HTMLDivElement>(null);
  // const { center, zoomLevel } = useSelector((state: RootState) => state.map);
  // const dispatch = useDispatch();
  // const [mapError, setMapError] = useState<string | null>(null);

  // useEffect(() => {
  //   const loadNaverMaps = () => {
  //     return new Promise<void>((resolve, reject) => {
  //       if (window.naver && window.naver.maps) {
  //         resolve();
  //       } else {
  //         const script = document.createElement('script');
  //         script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
  //         script.async = true;
  //         script.onload = () => resolve();
  //         script.onerror = () =>
  //           reject(new Error('Failed to load Naver Maps API'));
  //         document.head.appendChild(script);
  //       }
  //     });
  //   };

  //   const initializeMap = async () => {
  //     try {
  //       await loadNaverMaps();
  //       if (mapRef.current && window.naver && window.naver.maps) {
  //         const map = new window.naver.maps.Map(mapRef.current, {
  //           center: new window.naver.maps.LatLng(center.lat, center.lng),
  //           zoom: zoomLevel,
  //         });

  //         window.naver.maps.Event.addListener(map, 'center_changed', () => {
  //           const newCenter = map.getCenter();
  //           dispatch(
  //             setMapCenter({ lat: newCenter.lat(), lng: newCenter.lng() })
  //           );
  //         });

  //         window.naver.maps.Event.addListener(map, 'zoom_changed', () => {
  //           dispatch(setZoomLevel(map.getZoom()));
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Error initializing map:', error);
  //       setMapError('Failed to load the map. Please try again later.');
  //     }
  //   };

  //   initializeMap();
  // }, [dispatch, center, zoomLevel]);

  // if (mapError) {
  //   return (
  //     <div className='h-[calc(100vh-4rem)] w-full flex items-center justify-center'>
  //       {mapError}
  //     </div>
  //   );
  // }

  // return (
  //   <div className='h-[calc(100vh-4rem)] w-full'>
  //     <div ref={mapRef} className='h-full w-full' />
  //   </div>
  // );

  // return <div>Map</div>;

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
  }, []);

  return (
    <>
      <div id='map' style={{ width: '100%', height: '400px' }}></div>
    </>
  );
}
