'use client';

import Script from 'next/script';
import React, { useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './ui/button';
import {
  NaverMapContext,
  NaverMapContextProps,
} from '@/context/NaverMapContext';

export default function NaverMap({
  mapId,
  options = {
    zoom: 14,
    zoomControl: true,
    // zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT },
  },
  className = '',
  children,
}: {
  mapId: string;
  options?: naver.maps.MapOptions;
  className?: string;
  children?: React.ReactNode;
}) {
  const { mapRef } = useContext(NaverMapContext) as NaverMapContextProps;
  const [clickedCoord, setClickedCoord] = useState<naver.maps.LatLng | null>(
    null
  );

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

    map.setOptions({
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
        minZoom: 10,
        maxZoom: 21,
      },
    });
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
        className={twMerge('w-full h-[600px] relative', className)}
        // ref={mapRef} // 이 요소에 접근할 필요가 없는 듯? map 객체에만 접근하면 되는듯?
      >
        {children}
      </div>

      {clickedCoord && <div>{clickedCoord.toString()}</div>}
    </>
  );
}

export function NaverMapMoveToCurrentLocation() {
  const { mapRef, userLocation, setUserLocation } = useContext(
    NaverMapContext
  ) as NaverMapContextProps;

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

  const moveToCurrentLocation = () => {
    if (userLocation) {
      mapRef.current?.setCenter(userLocation);
    }
  };

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      getSuccess,
      getError,
      options
    );
  }, []);

  return (
    <Button
      onClick={moveToCurrentLocation}
      className='absolute bottom-2 left-2 z-10'
    >
      To Current Location
    </Button>
  );
}

// React에서 HTML의 script 태그에서 로드한 객체는 무조건 window 객체 내부에 저장된다.
// 흠, 그럼 Next.js의 Script 태그에서 로드한 객체도 같은건가?

// 마커 (좌표 디스플레이)
// 좌표 -> 주소 변환
// 마커 클러스터링
