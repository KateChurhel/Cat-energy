/**
 * Добавляет карту на страницу
 */
function initMap()  {
  let mapOption = {
    zoom: 17,
    center: new google.maps.LatLng(59.9391246,30.3200654)
  }
  let map = new google.maps.Map(document.querySelector(".contacts__map"), mapOption);
  let image = "img/map-pin.png";
  let myLatLng = new google.maps.LatLng(59.9388935,30.3227905);
  let pinMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: image,
  })
}
