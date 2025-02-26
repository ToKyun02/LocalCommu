'use client';

import { useKakao } from '@/context/KakaoContext';
import { placesSearchCB } from '@/lib/kakaoMap';
import { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

/**
 * 스크립트가 로드 될 때 KakaoAPI 함수가 실행됩니다.
 * @returns 카카오 지도 컴포넌트
 */
export default function KakaoMap() {
  const { kakao, setKakao } = useKakao();

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        setKakao({
          map: new window.kakao.maps.Map(container, options),
          place: new window.kakao.maps.services.Places(),
          infowindow: new window.kakao.maps.InfoWindow({ zIndex: 1 }),
        });
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);

    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoAPI);
      document.head.removeChild(kakaoMapScript);
    };
  }, []);

  useEffect(() => {
    if (kakao) {
      kakao.place.keywordSearch(
        '이태원 맛집',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any, status: any, pagination: any) => {
          placesSearchCB(data, status, pagination, kakao);
        },
      );
    }
  }, [kakao]);

  return (
    <>
      <div id='map' className='relative size-full'></div>
    </>
  );
}
