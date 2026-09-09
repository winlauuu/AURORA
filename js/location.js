/* =====================================================
   AURORA — LIVE LOCATION
   ===================================================== */

const firebaseConfig = {
    apiKey: "AIzaSyCQbxoG3mTQeyM857syQrWEVz0Cqk3uK4",
    authDomain: "aurora-810a3.firebaseapp.com",
    projectId: "aurora-810a3",
    storageBucket: "aurora-810a3.firebasestorage.app",
    messagingSenderId: "17674409166",
    appId: "1:17674409166:web:19e3e5d090abe5dd1dec9f",
    measurementId: "G-9CL5V2SVXV",
    databaseURL:
        "https://aurora-810a3-default-rtdb.asia-southeast1.firebasedatabase.app"
};


/* =====================================================
   FIREBASE
   ===================================================== */

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const locationRef = database.ref("icatLocation");


/* =====================================================
   JAKARTA
   ===================================================== */

const JAKARTA_LAT = -6.2088;
const JAKARTA_LNG = 106.8456;


/* =====================================================
   ELEMENTS
   ===================================================== */

const locationMapElement =
    document.getElementById("locationMap");

const liveLocationName =
    document.getElementById("liveLocationName");

const liveLocationStatus =
    document.getElementById("liveLocationStatus");

const locationTitle =
    document.getElementById("locationTitle");

const locationCoordinates =
    document.getElementById("locationCoordinates");

const locationUpdated =
    document.getElementById("locationUpdated");


/* =====================================================
   MAP
   ===================================================== */

let locationMap = null;
let icatMarker = null;
let jakartaMarker = null;
let distanceLine = null;


/* =====================================================
   INITIALIZE MAP
   ===================================================== */

function initializeMap() {

    if (!locationMapElement || typeof L === "undefined") {
        return;
    }

    if (locationMap) {
        return;
    }

    locationMap = L.map("locationMap");

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                '&copy; OpenStreetMap contributors'
        }
    ).addTo(locationMap);


    /* Jakarta */

    jakartaMarker = L.marker([
        JAKARTA_LAT,
        JAKARTA_LNG
    ])
        .addTo(locationMap)
        .bindPopup("Jakarta");


    locationMap.setView(
        [JAKARTA_LAT, JAKARTA_LNG],
        4
    );
}


/* =====================================================
   DISTANCE CALCULATION
   ===================================================== */

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const earthRadius = 6371;

    const dLat =
        (lat2 - lat1) *
        Math.PI / 180;

    const dLon =
        (lon2 - lon1) *
        Math.PI / 180;

    const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +

        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return earthRadius * c;
}


/* =====================================================
   UPDATE LOCATION
   ===================================================== */

function updateLocation(data) {

    if (!data) {

        if (liveLocationName) {
            liveLocationName.textContent =
                "Waiting...";
        }

        if (liveLocationStatus) {
            liveLocationStatus.textContent =
                "Waiting for location";
        }

        return;
    }


    const latitude =
        Number(data.latitude);

    const longitude =
        Number(data.longitude);


    if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
    ) {
        return;
    }


    initializeMap();


    /* =================================================
       MARKER
       ================================================= */

    const position = [
        latitude,
        longitude
    ];


    if (!icatMarker) {

        icatMarker = L.marker(position)
            .addTo(locationMap)
            .bindPopup("Current Location");

    } else {

        icatMarker.setLatLng(position);

    }


    /* =================================================
       LINE BETWEEN JAKARTA & ICAT
       ================================================= */

    if (distanceLine) {

        distanceLine.setLatLngs([
            [JAKARTA_LAT, JAKARTA_LNG],
            position
        ]);

    } else {

        distanceLine =
            L.polyline([
                [JAKARTA_LAT, JAKARTA_LNG],
                position
            ]).addTo(locationMap);

    }


    /* =================================================
       DISTANCE
       ================================================= */

    const distance =
        calculateDistance(
            JAKARTA_LAT,
            JAKARTA_LNG,
            latitude,
            longitude
        );


    /* =================================================
       UI
       ================================================= */

    if (liveLocationName) {

        liveLocationName.textContent =
            data.city || "Current Location";

    }


    if (liveLocationStatus) {

        liveLocationStatus.textContent =
            "Live location";

    }


    if (locationTitle) {

        locationTitle.textContent =
            `${distance.toFixed(0)} km away`;

    }


    if (locationCoordinates) {

        locationCoordinates.textContent =
            `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

    }


    if (
        locationUpdated &&
        data.updatedAt
    ) {

        const date =
            new Date(data.updatedAt);

        locationUpdated.textContent =
            `Last updated: ${date.toLocaleString(
                "en-AU",
                {
                    dateStyle: "medium",
                    timeStyle: "short"
                }
            )}`;

    }


    /* =================================================
       MAP VIEW
       ================================================= */

    locationMap.fitBounds([
        [JAKARTA_LAT, JAKARTA_LNG],
        position
    ], {
        padding: [40, 40]
    });


    /*
       Fix map rendering when distance page
       was initially hidden.
    */

    setTimeout(() => {

        if (locationMap) {
            locationMap.invalidateSize();
        }

    }, 300);
}


/* =====================================================
   REALTIME LISTENER
   ===================================================== */

locationRef.on(
    "value",
    (snapshot) => {

        const data =
            snapshot.val();

        updateLocation(data);

    },
    (error) => {

        console.error(
            "Firebase location error:",
            error
        );

    }
);


/* =====================================================
   OPEN MAP WHEN DISTANCE PAGE OPENS
   ===================================================== */

const distancePage =
    document.getElementById("distancePage");

const distanceMenu =
    document.querySelector(
        '[data-page="distancePage"]'
    );


if (distanceMenu) {

    distanceMenu.addEventListener(
        "click",
        () => {

            initializeMap();

            setTimeout(() => {

                if (locationMap) {
                    locationMap.invalidateSize();
                }

            }, 500);

        }
    );

}
