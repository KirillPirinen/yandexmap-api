if(document.querySelector('#map')) {

ymaps.ready(init);
let myMap;

async function init () {
    const response = await fetch(`/user/map/point`);
    const data = await response.json();
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64], // Углич
        zoom: 10
    }, {
        balloonMaxWidth: 200,
        searchControlProvider: 'yandex#search'
    });
    const points = data.map(e=>myGeoObject = new ymaps.GeoObject({
        // Описание геометрии.
        geometry: {
            type: "Point",
            coordinates: [e.x, e.y]
        },
        // Свойства.
        properties: {
            // Контент метки.
            iconContent: e.description,
        }
    }, {preset: 'islands#blackStretchyIcon'}));
    points.forEach(e=>myMap.geoObjects.add(e));
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            let coords = e.get('coords');
            myMap.balloon.open(coords, {
                contentHeader:'Новая точка на карте',
                contentBody:'<p>Координаты места: ' + [
                    coords[0].toPrecision(6),
                    coords[1].toPrecision(6)
                    ].join(', ') + '</p>',
                contentFooter:`<form data-form="newlocation">
                    <input type="hidden" name="x" value="${coords[0].toPrecision(6)}">
                    <input type="hidden" name="y" value="${coords[1].toPrecision(6)}">
                    <input type="text" name="description" placeholder="Описание места">
                    <button type="submit">Добавить в избранное</button>
                </form>`
            });
        }
        else {
            myMap.balloon.close();
        }
    });

    myMap.events.add('contextmenu', function (e) {
        myMap.hint.open(e.get('coords'), 'Кто-то щелкнул правой кнопкой');
    });
    
    // Скрываем хинт при открытии балуна.
    myMap.events.add('balloonopen', function (e) {
        myMap.hint.close();
    });
}

}
