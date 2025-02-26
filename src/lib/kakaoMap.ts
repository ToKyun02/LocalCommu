/* eslint-disable @typescript-eslint/no-explicit-any */
export const placesSearchCB = (
  data: any,
  status: any,
  pagination: any,
  kakao: any,
) => {
  if (status === window.kakao.maps.services.Status.OK) {
    const bounds = new window.kakao.maps.LatLngBounds();

    for (let i = 0; i < data.length; i++) {
      displayMarker(data[i], kakao);
      bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
    }

    kakao.map.setBounds(bounds);
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
