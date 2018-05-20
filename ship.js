var view = {
    displayMessage : function(msg){
        var messageArea  = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location){
        var cell = document.getElementById(location)
        cell.setAttribute("class","hit")
    },
    displayMiss: function(location){
        var cell = document.getElementById(location)
        cell.getAttribute("class","miss")
    }
}
var ships = [
    {location :["10","20","30"],hits : ["","",""]},
    {location :["32","33","34"],hits : ["","",""]},
    {location :["63","64","65"],hits:["","","hit"]}
];
var model = {
    borderSize:7,
    numShips:3,
    shipLength:3,
    shipsSunk:0,
ships = [
    {location :["06","16","26"],hits : ["","",""]},
    {location :["24","34","44"],hits : ["","",""]},
    {location :["10","11","12"],hits:["","","hit"]}
],
fire: function (guess) {
    for(var i=0;i < this.numShips;i++){
        var ship = this.ships[i];
        locations = ship.locations;
        var index = locations.indexof(guess);
        if(index>=0){
            ship.hits[index] = "hit";
            return true;
        }
    }
    return false;
}
}
view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");
