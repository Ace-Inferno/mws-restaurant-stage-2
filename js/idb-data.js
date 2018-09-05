let restaurantData;

function handleSuccess () {
  const json = JSON.parse(this.responseText);
  caches.open('offline').then(function(cache){cache.add(`${DBHelper.DATABASE_URL}`)});
  restaurantData = json;
  console.log(restaurantData);
}
function handleError () {
  console.log( 'An error occurred' );
}
function getJSON(){
  const database = new XMLHttpRequest();
  database.open('GET', DBHelper.DATABASE_URL);
  database.onload = handleSuccess;
  database.onerror = handleError;
  database.send();
}
function createIDB(){
  const dbName = "Restaurant_Database";
  var request = indexedDB.open(dbName, 1);
  request.onupgradeneeded = function (event) {
      var db = event.target.result;
      var objStore = db.createObjectStore("Restaurant_Data", { autoIncrement : true });
      restaurantData.forEach(function(restaurant) {
          objStore.add(restaurant);
      });
  };
}

getJSON();
createIDB();
