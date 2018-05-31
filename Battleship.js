var view = {
    displayMessage: function (msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");//setAttribute() 1.添加指定属性，并为其赋指定的值。2.为指定已存在的属性，设置/更改值。
    },
    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};
//view.displayHit("11");
//view.displayMiss("12");


var model = {
    boardSize: 7,//网格大小
    numShips: 3,//战舰数
    shipLength: 3,//每个战舰占据的单元格
    shipsSunk: 0,//被击沉的战舰数

    ships: [
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] }
    ],
    //locations中存储战舰占据的单元格，hits中存储空字符串，当某个部位被击中后，相应的元素改为“hit”
    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            //locations = ship.locations;
            //var index = locations.indexOf(guess)   用indexOf查找给与guess这一参数的值
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit"; // ship.hits[index] = model.ships[ship.locations.indexOf(guess)] 将hit存储在hits: ["", "", ""]中
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) { //当战舰被击沉时，this.isSunk(ship)返回为true 如果只是被击中则返回flase
                    view.displayMessage("You sank my battleship!")
                    this.shipsSunk++;
                }
                return true;// 击中战舰返回true
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;//发现不了战舰
    },

    isSunk: function (ship) { 
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },


    generateShipLocations: function () {
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    },

    generateShip: function () {
        var direction = Math.floor(Math.random() * 2);//Math.random生成一个0~1的随机数
        var row, col;

        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);//row为起始行号 col为起始列号
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));//水平战舰
        } else {
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));//垂直战舰
            col = Math.floor(Math.random() * this.boardSize);
        }

        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));// push（）在数组的末尾添加一个数据
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },

    collision: function (locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = model.ships[i];//迭代每艘战舰
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {//是否有战舰重复
                    return true;
                }
            }
        }
        return false;//未发生战舰重复问题
    }
};

//model.fire("53");
function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    

    if (guess === null || guess.length !== 2) { // || 为或 && 为且
        alert("Oops, please enter a letter and a number on the board.")
    } else {
        firstChar = guess.charAt(0);//返回指定位置的字符
        var row = alphabet.indexOf(firstChar);// 获取猜测位置guess的第一个字符
        var column = guess.charAt(1);// 获取猜测位置guess的第二个字符

        if (isNaN(row) || isNaN(column)) { // isNaN（）判断是不是一个非数字 
            alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board!");
        } else {
            return row + column;// row为数字，column为字符串
        }
    }
    return null;
}


var controller = {
    guesses: 0,//初始猜测次数为0

    processGuess: function (guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {//击中了战舰且击沉的战舰数与游戏包含的战舰数相同
                view.displayMessage("You sank all my battleships, in " + this.guesses + "guesses");
            }
        }
    }
};
//controller.processGuess("A0");

function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;//键盘按键被按下并释放一个键时发生

    model.generateShipLocations();//修改模型中的空数组
}

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";//使用户下一次输入，不用删除上一次的猜测
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) { //如果按下的是回车键，则让fire键以为自己被单击了
        fireButton.click();
        return false;
    }
}

//document.onkeypress = function(ev){
    //var oEvent = ev || event;   
    //document.getElementById("guessInput").value = String.fromCharCode(oEvent.keyCode);
//};

    // str = "";
    // function showkey() {
    //     asc = event.keyCode;
    //     key = String.fromCharCode(asc);
    //     str += key;
    //     guessInput.value = str;
    //     if (guessInput.value.length >= 2) {
    //         str = "";
    //     }
    // }
    // document.onkeypress = showkey;
//document.getElementById("guessInput").focus();
    
window.onload = init;

