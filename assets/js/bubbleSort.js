var arr2 = [],
    arrLevel2 = 0,
    arrLevelLow2 = 0,
    direction2 = true,
    time2 = 0,
    sortType2 = "bubbleSort",
    step2 = 0,
    drawing2 = 0,
    sortView2 = "classicView";

var canvas2 = document.getElementById("canvas2"),
    ctx2 = canvas2.getContext("2d");

var playing2 = false;

var colors2 = ["#808b8c", "#7efcbd", "#5a6978", "#fc7c7c", "#04d104", "#015c01", "#c1d4d4"],
    colorPick2 = 3;

calcNewArr2();


function startButton2() {
    if (!playing2) {
        playing2 = true;
        document.getElementsByClassName("button-play2")[0].style.backgroundPosition = "-59px -4px";
        initSort2();
    } else {
        playing2 = false;
        document.getElementsByClassName("button-play2")[0].style.backgroundPosition = "-59px -44px";
        clearInterval(drawing2);
        resetImage2();
    }
}

function changeSpeed2() {
    if (playing2) {
        clearInterval(drawing2);
        initSort2();
    }
}


function resetImage2() {
    ctx2.clearRect(10, 10, canvas2.width - 20, canvas2.width - 20);
    drawArr2(arr2);
}

function compareRandom2(arr2) {
    var j, x;
    for (var i = arr2.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arr2[i - 1];
        arr2[i - 1] = arr2[j];
        arr2[j] = x;
    }
}

function calcNewArr2() {
    arr2 = [];
    for (var i = 0; i < +document.getElementById("elementsNumb2").value; i++) {
        arr2.push(Math.round(((canvas2.width / 2) - (75) - 59)));
    }
    for (i = 0; i < arr2.length; i++) {
        arr2[i] = arr2[i] * ((i) * ((0.64 / arr2.length))) + 90;
    }
    step2 = arr2.length - 2;
    time2 = 0;
    direction2 = true;
    compareRandom2(arr2);
    resetImage2();
}


function drawArr2(arr2) {
    ctx2.lineWidth = 2 * Math.PI * (75) / arr2.length;


    if (sortType2 === "bubbleSort") {
        for (var i = 0; i < arr2.length; i++) {
            lineFunction2(false, i, colors2[0]);
            lineFunction2(false, time2 - 1, colors2[colorPick2]);
            lineFunction2(false, time2, colors2[colorPick2]);
            lineFunction2(true, i, colors2[2]);
        }
    }
}

function lineFunction2(pommel2, radCord2, color2) {

    if (sortView2 == "classicView") {
        ctx2.strokeStyle = color2;
        ctx2.lineWidth = canvas2.width * 0.75 / arr2.length;
        if (pommel2) {
            ctx2.beginPath();
            ctx2.moveTo(radCord2 * (canvas2.width * 0.9 / arr2.length) + 30, canvas2.width / 2 - arr2[radCord2]);
            ctx2.lineTo(radCord2 * (canvas2.width * 0.9 / arr2.length) + 30, canvas2.width / 2 - arr2[radCord2] - canvas2.width * 0.8 / arr2.length);
            ctx2.stroke();
        } else {
            ctx2.beginPath();
            ctx2.moveTo(radCord2 * (canvas2.width * 0.9 / arr2.length) + 30, canvas2.width / 2);
            ctx2.lineTo(radCord2 * (canvas2.width * 0.9 / arr2.length) + 30, canvas2.width / 2 - arr2[radCord2]);
            ctx2.stroke();
        }
    }
    if (sortView2 == "gradientView") {
        var gradientValue = canvas2.width / arr2.length + 50;
        ctx2.lineWidth = canvas2.width / arr2.length;
        if (time2 > 1) {
            ctx2.strokeStyle = colors2[2];
            ctx2.beginPath();
            if (sortType2 == "bubbleSort") {
                ctx2.moveTo((time2 - 1) * (canvas2.width * 0.8 / arr2.length) + gradientValue, canvas2.width / 2 - 300);
                ctx2.lineTo((time2 - 1) * (canvas2.width * 0.8 / arr2.length) + gradientValue, canvas2.width / 2 - 300 - canvas2.width * 0.8 / arr2.length);
            }

            ctx2.stroke();

            ctx2.beginPath();

            if (sortType2 == "bubbleSort") {
                ctx2.moveTo((time2) * (canvas2.width * 0.8 / arr2.length) + gradientValue, canvas2.width / 2 - 300);
                ctx2.lineTo((time2) * (canvas2.width * 0.8 / arr2.length) + gradientValue, canvas2.width / 2 - 300 - canvas2.width * 0.8 / arr2.length);
            }

            ctx2.stroke();
        }
        ctx2.strokeStyle = "hsla( 199, 17%, " + 100 * arr2[radCord2] / 300 + "%, 1)";
        if (!pommel2) {
            ctx2.beginPath();
            ctx2.moveTo(radCord2 * (canvas2.width * 0.8 / arr2.length) + canvas2.width / arr2.length + 50, canvas2.width / 2);
            ctx2.lineTo(radCord2 * (canvas2.width * 0.8 / arr2.length) + canvas2.width / arr2.length + 50, canvas2.width / 2 - 300);
            ctx2.stroke();
        }
    }


}

function initSort2() {
    drawing2 = setInterval(sort2, Math.abs(+document.getElementById("codeSpeed2").value - 200));
}



function changeSortView2() {
    var selectBox = document.getElementById("selectBox2");
    var selectedValu = selectBox.options[selectBox.selectedIndex].value;
    sortView2 = selectedValu;

    resetImage2();
}

function sort2() {
    ctx2.clearRect(10, 10, canvas2.width - 20, canvas2.width - 20);


    if (sortType2 === "bubbleSort") {

        ctx2.clearRect(10, 10, canvas2.width - 20, canvas2.width - 20);

        if (arr2[time2] > arr2[time2 + 1]) {
            colorPick2 = 3;
        } else colorPick2 = 1;

        drawArr2(arr2);

        if (arrLevel2 > arr2.length) {
            terminateProgram2();
        }

        for (var i = 0; i < arr2.length - 1; i++) {
            if (arr2[i] <= arr2[i + 1]) {
                arrLevel2++;
            } else {
                arrLevel2 = 0;
            }
        }

        if (time2 < arr2.length - 1 - arrLevel2) {

            if (arr2[time2] > arr2[time2 + 1]) {
                var temp = arr2[time2 + 1];
                arr2[time2 + 1] = arr2[time2];
                arr2[time2] = temp;
            }
            time2++;

        } else {
            time2 = 0;
        }
    }

}

function terminateProgram2() {
    clearInterval(drawing2);
    ctx2.clearRect(10, 10, canvas2.width - 20, canvas2.width - 20);
    time2 = 0;
    colorPick2 = 3;
    ctx2.lineWidth = 2 * Math.PI * (75) / arr2.length;
    for (var i = 0; i < arr2.length; i++) {
        lineFunction2(false, i, colors2[0]);
        lineFunction2(true, i, colors2[2]);
    }
    i = 0;
    var finishDraw = setInterval(function () {
        if (i < arr2.length) {
            lineFunction2(false, i, colors2[1]);
            lineFunction2(true, i, colors2[5]);

        } else {
            clearInterval(finishDraw);
            arrLevel2 = 0;
            arrLevelLow2 = 0;
            playing2 = false;
            document.getElementsByClassName("button-play2")[0].style.backgroundPosition = "-59px -44px";

        }
        i++;
    }, Math.abs(+document.getElementById("codeSpeed2").value - 200) * 0.7);
}

