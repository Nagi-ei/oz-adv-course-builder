'use client';

import Script from 'next/script';
import React, { Suspense, use, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './ui/button';
import { useNaverMap } from '@/context/NaverMapContext';
import { LocateFixed } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';

// 네이버 지도 컴포넌트
export default function NaverMap({
  mapId,
  options = {
    zoom: 14,
    zoomControl: true,
    // zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT }, // 여기선 naver가 정의되어 있지 않음
  },
  className = '',
  children,
}: {
  mapId: string;
  options?: naver.maps.MapOptions;
  className?: string;
  children?: React.ReactNode;
}) {
  const { mapRef, setClickedCoord } = useNaverMap();

  // 맵 옵션 객체 예시
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

    // 클릭 장소 좌표 저장
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
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
        onLoad={createMap}
      />
      <div
        id={mapId}
        className={twMerge('w-full h-[600px] relative', className)}
        // ref={mapRef} // 이 요소에 접근할 필요가 없는 듯? map 객체에만 접근하면 되는듯?
      >
        {children}
      </div>
    </>
  );
}

// 현재 위치로 이동 버튼
export function ToCurrentLocation() {
  const { mapRef, userLocation, setUserLocation } = useNaverMap();

  const getSuccess = (position: GeolocationPosition) => {
    console.log('현재 위치 받아오기 성공');
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
      className='absolute bottom-2 left-2 z-10 p-2 rounded-full'
    >
      <LocateFixed />
    </Button>
  );
}

// 클릭 주소 표시창 (지도 위에 올리기)
export function ClickedAddress() {
  const { mapRef, clickedCoord, setClickedCoord } = useNaverMap();
  if (!clickedCoord) return null;

  // 클릭 좌표 콘솔
  console.log(`위도: ${clickedCoord.y}, 경도: ${clickedCoord.x}`);

  const addressRes = getAddressPromise(clickedCoord);

  return (
    <>
      {/* <div>{clickedCoord.toString()}</div> */}
      <ErrorBoundary fallback={<div>Error!</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <InfoWindow addressRes={addressRes} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

function InfoWindow({
  addressRes,
}: {
  addressRes: Promise<naver.maps.Service.ReverseGeocodeResponse>;
}) {
  const { mapRef } = useNaverMap();
  // if (!mapRef.current) return null;
  const addressObj = use(addressRes);
  // console.log(addressObj);

  const contentString = [
    `<div className='iw_inner'>`,
    `  <h3>위치 정보</h3>`,
    `  <p>지번주소: ${addressObj.v2.address.jibunAddress}</p>`,
    `  <p>도로명주소: ${addressObj.v2.address.roadAddress}</p>`,
    `</div>`,
  ].join('\n');

  const infoWindow = new naver.maps.InfoWindow({
    content: contentString,
    // borderWidth: 0,
    // backgroundColor: 'transparent',
  });

  naver.maps.Event.addListener(infoWindow, 'click', (e) => {
    infoWindow.close();
  });

  naver.maps.Event.addListener(mapRef.current, 'click', (e) => {
    if (infoWindow.getMap()) {
      infoWindow.close();
    }
    if (mapRef.current) {
      infoWindow.open(mapRef.current, e.coord);
    }
  });

  return (
    <>
      <div>{addressObj.v2.address.jibunAddress}</div>
      <div>{addressObj.v2.address.roadAddress}</div>
    </>
  );
}

// 좌표 -> 주소 변환
function getAddressPromise(
  coords: naver.maps.LatLng
): Promise<naver.maps.Service.ReverseGeocodeResponse> {
  return new Promise((resolve, reject) => {
    naver.maps.Service.reverseGeocode(
      {
        coords,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(','),
      },
      (
        stat: naver.maps.Service.Status,
        res: naver.maps.Service.ReverseGeocodeResponse
      ) => {
        if (stat !== naver.maps.Service.Status.OK) {
          reject(new Error('주소 변환 실패'));
        }
        resolve(res);
      }
    );
  });
}

// React에서 HTML의 script 태그에서 로드한 객체는 무조건 window 객체 내부에 저장된다.
// 흠, 그럼 Next.js의 Script 태그에서 로드한 객체도 같은건가?

// 마커 (주소 정보 창)
// 마커 클러스터링
