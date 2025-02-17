'use client';

import NaverMap, {
  ClickedAddress,
  ToCurrentLocation,
} from '@/components/NaverMap';
import { NaverMapContextProvider } from '@/context/NaverMapContext';

export default function Map() {
  return (
    <>
      <NaverMapContextProvider>
        <NaverMap mapId='test_map'>
          <ToCurrentLocation />
          <ClickedAddress />
        </NaverMap>
      </NaverMapContextProvider>
    </>
  );
}
