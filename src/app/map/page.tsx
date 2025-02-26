import KakaoMap from '@/components/map/KakaoMap';
import { KakaoProvider } from '@/context/KakaoContext';

export default function Map() {
  return (
    <>
      <KakaoProvider>
        <KakaoMap />
      </KakaoProvider>
    </>
  );
}
