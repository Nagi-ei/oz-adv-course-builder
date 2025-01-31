import Script from 'next/script';
import React, { useRef } from 'react';

export default function NaverMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const initMap = () => {
    let map: naver.maps.Map;
    const center: naver.maps.LatLng = new naver.maps.LatLng(
      37.3595704,
      127.105399
    );

    map = new naver.maps.Map('map', {
      center: center,
      zoom: 16,
    });
  };

  return (
    <>
      <Script
        // strategy='beforeInteractive'
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        onLoad={initMap}
      />
      <div
        id='map'
        style={{ width: '100%', height: '400px' }}
        ref={mapRef}
      ></div>
    </>
  );
}

// React에서 HTML의 script 태그에서 로드한 객체는 무조건 window 객체 내부에 저장된다.
// 흠, 그럼 Next.js의 Script 태그에서 로드한 객체도 같은건가?
