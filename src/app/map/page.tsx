'use client';

import NaverMap, {
  ClickedCoordMap,
  ToCurrentLocation,
} from '@/components/NaverMap';
import { NaverMapContextProvider } from '@/context/NaverMapContext';

export default function Map() {
  return (
    <>
      <NaverMapContextProvider>
        <NaverMap mapId='test_map'>
          <ToCurrentLocation />
        </NaverMap>
        {/* 마커나 정보 창 완성하면 NaverMap 안으로 옮기기 */}
        <ClickedCoordMap />
      </NaverMapContextProvider>
    </>
  );
}
