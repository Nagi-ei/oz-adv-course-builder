'use client';

import NaverMap, { NaverMapMoveToCurrentLocation } from '@/components/NaverMap';
import NaverMapContextProvider from '@/context/NaverMapContext';

export default function Map() {
  return (
    <>
      <NaverMapContextProvider>
        <NaverMap mapId='test_map'>
          <NaverMapMoveToCurrentLocation />
        </NaverMap>
      </NaverMapContextProvider>
    </>
  );
}
