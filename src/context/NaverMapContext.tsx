import { createContext, useContext, useRef, useState } from 'react';

export type NaverMapContextProps = {
  mapRef: React.RefObject<naver.maps.Map | null>;
  clickedCoord: naver.maps.LatLng | null;
  setClickedCoord: (coord: naver.maps.LatLng) => void;
  userLocation: naver.maps.LatLng | null;
  setUserLocation: (location: naver.maps.LatLng) => void;
};

const NaverMapContext = createContext<NaverMapContextProps | null>(null);

export function NaverMapContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const mapRef = useRef<naver.maps.Map>(null);
  const [clickedCoord, setClickedCoord] = useState<naver.maps.LatLng | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<naver.maps.LatLng | null>(
    null
  );

  return (
    <NaverMapContext.Provider
      value={{
        mapRef,
        clickedCoord,
        setClickedCoord,
        userLocation,
        setUserLocation,
      }}
    >
      {children}
    </NaverMapContext.Provider>
  );
}

export function useNaverMap() {
  const context = useContext(NaverMapContext);
  if (!context) {
    throw new Error('NaverMapContext 범위 바깥에서 사용됨.');
  }
  return context;
}
