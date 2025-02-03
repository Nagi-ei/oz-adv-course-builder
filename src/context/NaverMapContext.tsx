import { createContext, useRef, useState } from 'react';

export type NaverMapContextProps = {
  mapRef: React.RefObject<naver.maps.Map | null>;
  userLocation: naver.maps.LatLng | null;
  setUserLocation: (location: naver.maps.LatLng) => void;
};

export const NaverMapContext = createContext<NaverMapContextProps | null>(null);

export default function NaverMapContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const mapRef = useRef<naver.maps.Map>(null);
  const [userLocation, setUserLocation] = useState<naver.maps.LatLng | null>(
    null
  );

  return (
    <NaverMapContext.Provider value={{ mapRef, userLocation, setUserLocation }}>
      {children}
    </NaverMapContext.Provider>
  );
}
