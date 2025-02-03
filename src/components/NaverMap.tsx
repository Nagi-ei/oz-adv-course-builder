'use client';

import Script from 'next/script';
import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './ui/button';

export default function NaverMap({
  mapId,
  options = { zoom: 14 },
  className = '',
}: {
  mapId: string;
  options?: naver.maps.MapOptions;
  className?: string;
}) {
  const mapRef = useRef<naver.maps.Map>(null);
  const [clickedCoord, setClickedCoord] = useState<naver.maps.LatLng | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<naver.maps.LatLng | null>(
    null
  );

  useEffect(() => {
    // 컴포넌트 분리하고 함수 정의하는 부분은 useEffect 밖으로 빼기
    const getSuccess = (position: GeolocationPosition) => {
      console.log(position.coords.latitude, position.coords.longitude);
      const locationCoords = new naver.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      setUserLocation(locationCoords);
    };

    // 에러 처리: 컴포넌트 분리 후에 추가
    const getError = () => {
      console.log('geolocation api error');
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 1000 * 5, // 5 s
      maximumAge: 1000 * 60 * 1, // 1 m
    };

    window.navigator.geolocation.getCurrentPosition(
      getSuccess,
      getError,
      options
    );
  }, []);

  // {
  //   center: center,
  //   zoom: 14,
  //   scaleControl: true,
  //   mapDataControl: true,
  //   mapTypeControl: true,
  //   zoomControl: true,
  // }

  const createMap = () => {
    let map: naver.maps.Map;
    map = new naver.maps.Map(mapId, options);
    mapRef.current = map;

    map.addListener('click', (e) => {
      console.log(e.coord);
      setClickedCoord(e.coord);
    });
  };

  const moveToCurrentLocation = () => {
    console.log('moveToCurrentLocation');
    if (userLocation) {
      mapRef.current?.setCenter(userLocation);
    }
  };

  return (
    <>
      <Script
        // strategy='beforeInteractive'
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        onLoad={createMap}
      />
      <div
        id={mapId}
        className={twMerge('w-full h-[600px]', className)}
        // ref={mapRef}
      />
      <Button onClick={moveToCurrentLocation}>To Current Location</Button>
      {clickedCoord && <div>{clickedCoord.toString()}</div>}
    </>
  );
}

// React에서 HTML의 script 태그에서 로드한 객체는 무조건 window 객체 내부에 저장된다.
// 흠, 그럼 Next.js의 Script 태그에서 로드한 객체도 같은건가?

// 마커 (좌표 디스플레이)
// 마커 클러스터링
// 좌표 -> 주소 변환
