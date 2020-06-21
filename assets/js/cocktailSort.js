var arr3 = [],
    arrayLevel3 = 0,
    arrayLevelLow3 = 0,
    direction3 = true,
    time3 = 0,
    sortType3 ="cocktailSort",
    step3 = 0,
    drawing3 = 0,
    sortView3 = "classicView";

var canvas3 = document.getElementById("canvas3"),
    ctx3 = canvas3.getContext("2d");

var playing3 = false;

var colors3 = ["#808b8c", "#7efcbd", "#5a6978", "#fc7c7c", "#04d104", "#015c01", "#c1d4d4"],
    colorPick3 = 3;

calcNewArr3();


function startButton3() {
    if (!playing3) {
        playing3 = true;
        document.getElementsByClassName("button-play3")[0].style.backgroundPosition = "-59px -4px";
        initSort3();
    } else {
        playing3 = false;
        document.getElementsByClassName("button-play3")[0].style.backgroundPosition = "-59px -44px";
        clearInterval(drawing3);
        resetImage3();
    }
}

function changeSpeed3() {
    if (playing3) {
        clearInterval(drawing3);
        initSort3();
    }
}


function resetImage3 () {
    ctx3.clearRect(10, 10, canvas3.width-20, canvas3.width-20);
    drawArr3(arr3);
}

function compareRandom3(arr3) {
    var j, x;
    for (var i = arr3.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arr3[i - 1];
        arr3[i - 1] = arr3[j];
        arr3[j] = x;
    }
}

function calcNewArr3() {
    arr3=[];
    for (var i = 0; i < +document.getElementById("elementsNumb3").value; i++) {
        arr3.push(Math.round(( (canvas3.width/2) - (75) - 59)));
    }
    for (i = 0; i < arr3.length; i++) {
        arr3[i] =  arr3[i] * ((i)*((0.64/arr3.length))) + 90;
    }
    step3 = arr3.length-2;
    time3 = 0;
    direction3 = true;
    compareRandom3(arr3);
    resetImage3();
}



function drawArr3(arr3) {
    ctx3.lineWidth = 2*Math.PI*(75)/arr3.length;

    
    if (sortType3 === "cocktailSort") {
        if (direction3) {
            for (var i = 0; i < arr3.length; i++) {
                lineFunction3(false, i, colors3[0]);
                lineFunction3(false, time3-1, colors3[colorPick3]);
                lineFunction3(false, time3, colors3[colorPick3]);
                lineFunction3(true, i, colors3[2]);
            }
        } else {
            for (var i = 0; i < arr3.length; i++) {
                lineFunction3(false, i, colors3[0]);
                lineFunction3(false, time3+2, colors3[colorPick3]);
                lineFunction3(false, time3+1, colors3[colorPick3]);
                lineFunction3(true, i, colors3[2]);
            }
        }
    }
}

function lineFunction3(pommel3, radCord, color) {

    if (sortView3 == "classicView") {
        ctx3.strokeStyle = color;
        ctx3.lineWidth = canvas3.width*0.75 / arr3.length;
        if (pommel3) {
            ctx3.beginPath();
            ctx3.moveTo(radCord * (canvas3.width*0.9 / arr3.length)+30, canvas3.width/2 - arr3[radCord]);
            ctx3.lineTo(radCord * (canvas3.width*0.9 / arr3.length)+30, canvas3.width/2 - arr3[radCord] - canvas3.width*0.8 / arr3.length);
            ctx3.stroke();
        } else {
            ctx3.beginPath();
            ctx3.moveTo(radCord * (canvas3.width*0.9 / arr3.length)+30, canvas3.width/2);
            ctx3.lineTo(radCord * (canvas3.width*0.9 / arr3.length)+30, canvas3.width/2 - arr3[radCord]);
            ctx3.stroke();
        }
    }
    if (sortView3 == "gradientView") {
        var gradientValue = canvas3.width/arr3.length + 50;
        ctx3.lineWidth = canvas3.width / arr3.length;
        if (time3 > 1) {
            ctx3.strokeStyle = colors3[2];
            ctx3.beginPath();
            if (sortType3 == "cocktailSort") {
                if (direction3) {
                    ctx3.moveTo((time3 - 1) * (canvas3.width * 0.8 / arr3.length) + gradientValue, canvas3.width / 2 - 300);
                    ctx3.lineTo((time3 - 1) * (canvas3.width * 0.8 / arr3.length) + gradientValue, canvas3.width / 2 - 300 - canvas3.width * 0.8 / arr3.length);
                } else {
                    ctx3.moveTo((time3 + 2) * (canvas3.width * 0.8 / arr3.length) + gradientValue, canvas3.width / 2 - 300);
                    ctx3.lineTo((time3 + 2) * (canvas3.width * 0.8 / arr3.length) + gradientValue, canvas3.width / 2 - 300 - canvas3.width * 0.8 / arr3.length);
                }
            }
            ctx3.stroke();

            ctx3.beginPath();
            
            if (sortType3 == "cocktailSort") {
                if (direction3) {
                    ctx3.moveTo(time3 * (canvas3.width * 0.8 / arr3.length) + gradientValue, canvas3.width / 2 - 300);
                    ctx3.lineTo(time3 * (canvas3.width * 0.8 / arr3.length) + gradientValue, canvas3.width / 2 - 300 - canvas3.width * 0.8 / arr3.length);
                } else {
                    ctx3.moveTo((time3 + 1) * (canvas3.width * 0.8 / arr3.length) + gradientValue, canvas3.width / 2 - 300);
                    ctx3.lineTo((time3 + 1) * (canvas3.width * 0.8 / arr3.length) + gradientValue, canvas3.width / 2 - 300 - canvas3.width * 0.8 / arr3.length);
                }
            }
                ctx3.stroke();
            }
        ctx3.strokeStyle = "hsla( 199, 17%, "+100*arr3[radCord]/300+"%, 1)";
        if (!pommel3) {
            ctx3.beginPath();
            ctx3.moveTo(radCord * (canvas3.width*0.8 / arr3.length)+canvas3.width/arr3.length + 50, canvas3.width/2);
            ctx3.lineTo(radCord * (canvas3.width*0.8 / arr3.length)+canvas3.width/arr3.length + 50, canvas3.width/2 - 300);
            ctx3.stroke();
        }
    }


}

function initSort3() {
    drawing3 = setInterval(sort3, Math.abs(+document.getElementById("codeSpeed3").value-200)); // code repeat interval
}


function changeSortView3() {
    var selectBox = document.getElementById("selectBox3");
    var selectedValuw = selectBox.options[selectBox.selectedIndex].value;
    sortView3 = selectedValuw;

    resetImage3();
}

function sort3() {
    ctx3.clearRect(10, 10, canvas3.width-20, canvas3.width-20);

   


    if (sortType3 === "cocktailSort") { 
        if (arrayLevel3+arrayLevelLow3 > arr3.length) {
            terminateProgram3();
        }

        ctx3.clearRect(10, 10, canvas3.width-20, canvas3.width-20);
        drawArr3(arr3);


        if (direction3) {
            for (var i = 0; i < arr3.length-1; i++) {
                if (arr3[i] < arr3[i+1]) {
                    arrayLevel3++;
                } else {
                    arrayLevel3=0;
                }
            }
        } else {
            for (i = arr3.length; i > 1; i--) {
                if (arr3[i] > arr3[i-1]) {
                    arrayLevelLow3++;
                } else {
                    arrayLevelLow3=0;
                }
            }
        }

        if (direction3) {
            if (time3 < arr3.length-arrayLevel3-1) {

                if (arr3[time3] > arr3 [time3+1]) {
                    var temp = arr3[time3+1];
                    arr3[time3+1] = arr3[time3];
                    arr3[time3] = temp;
                    colorPick3 = 3;
                } else {
                    colorPick3 = 1;
                }
                time3++;

            } else {
                direction3=false;
            }
        }


        if (!direction3) {
            if (time3 > arrayLevelLow3) {

                if (arr3[time3] > arr3 [time3+1]) {
                    var temp = arr3[time3+1];
                    arr3[time3+1] = arr3[time3];
                    arr3[time3] = temp;
                    colorPick3 = 3;
                } else {
                    colorPick3 = 1;
                }
                time3--;

            } else {
                direction3=true;
            }
        }
    }
}

function terminateProgram3() {
    clearInterval(drawing3);
    ctx3.clearRect(10, 10, canvas3.width-20, canvas3.width-20);
    time3 = 0;
    colorPick3 = 3;
    ctx3.lineWidth = 2 * Math.PI * (75) / arr3.length;
    for (var i = 0; i < arr3.length; i++) {
        lineFunction3(false, i, colors3[0]);
        lineFunction3(true, i, colors3[2]);
    }
    i = 0;
    var finishDrawing = setInterval(function() { 
        if (i < arr3.length) {
            lineFunction3(false, i, colors3[1]);
            lineFunction3(true, i, colors3[5]);

        } else {
            clearInterval(finishDrawing);
            arrayLevel3 = 0;
            arrayLevelLow3 = 0;
            playing3 = false;
            document.getElementsByClassName("button-play3")[0].style.backgroundPosition = "-59px -44px";
            
        }
        i++;
    }, Math.abs(+document.getElementById("codeSpeed3").value-200)*0.7);
}

