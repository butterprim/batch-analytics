function openIndexedDB (fileindex) {
  // This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
  var indexedDB = self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB || self.shimIndexedDB;

  var openDB = indexedDB.open("Analytics", 1);

  openDB.onupgradeneeded = function() {
    var db = {}
    db.result = openDB.result;
    db.store = db.result.createObjectStore("AnalyticsStore", {keyPath: "id"});
  };

  return openDB;
}

function getStoreIndexedDB (openDB) {
  var db = {};
  db.result = openDB.result;
  db.tx = db.result.transaction("AnalyticsStore", "readwrite");
  db.store = db.tx.objectStore("AnalyticsStore");
  return db;
}

function saveIndexedDB (id, data, fileindex) {
  var openDB = openIndexedDB(fileindex);

  openDB.onerror = function(e) {
    console.log(e);
  };

  openDB.onsuccess = function() {
    var db = getStoreIndexedDB(openDB);

    db.store.put({id, data});
    console.log('successfully added data');
  };

  return true;
}

function saveAnalytics() {
  // pull data from indexeddb and upload to web service
  console.log('save analytics here');
}

self.addEventListener('sync', function(event) {
  if (event.tag == 'sync-analytics') {
    event.waitUntil(saveAnalytics());
  }
});


self.addEventListener('message', function(event) {
  if (event.data.type === 'event-track') {
    const id = +new Date();

    saveIndexedDB(id, {
      "name": event.data.eventName,
      "trackedData": event.data.trackedData,
      "properties": event.data.properties
    });
  }
});