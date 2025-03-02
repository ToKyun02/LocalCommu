/* eslint-disable @typescript-eslint/no-explicit-any */
export const placesSearchCB = (
  data: any,
  status: any,
  pagination: any,
  kakao: any,
  setList: any,
) => {
  if (status === window.kakao.maps.services.Status.OK) {
    document.querySelectorAll('div').forEach((div) => {
      if (div.style.margin === '-39px 0px 0px -14px') {
        div.remove();
      }
    });

    const bounds = new window.kakao.maps.LatLngBounds();

    for (let i = 0; i < data.length; i++) {
      displayMarker(data[i], kakao);
      bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
    }

    kakao.map.setBounds(bounds);
    setList({ data, pagination });
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert('검색 결과가 존재하지 않습니다.');
    return;
  } else {
    alert('검색 결과 중 오류가 발생했습니다.');
    return;
  }
};

const displayMarker = (place: any, kakao: any) => {
  const marker = new window.kakao.maps.Marker({
    map: kakao.map,
    position: new window.kakao.maps.LatLng(place.y, place.x),
  });

  window.kakao.maps.event.addListener(marker, 'click', () => {
    kakao.infowindow.setContent(
      '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>',
    );
    kakao.infowindow.open(kakao.map, marker);
  });
};
