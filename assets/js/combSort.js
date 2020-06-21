var arr1 = [],
    arrLevel1 = 0,
    arrLevelLow1 = 0,
    direction1 = true,
    time1 = 0,
    sortType1 = "combSort",
    step1 = 0,
    drawing1 = 0,
    sortView1 = "classicView";

var canvas1 = document.getElementById("canvas1"),
    context1 = canvas1.getContext("2d");

var playing1 = false;

var colors1 = ["#808b8c", "#7efcbd", "#5a6978", "#fc7c7c", "#04d104", "#015c01", "#c1d4d4"],
    colorPick1 = 3;

calcNewArr1();


function startButton1() {
    if (!playing1) {
        playing1 = true;
        document.getElementsByClassName("button-play1")[0].style.backgroundPosition = "-59px -4px";
        initSort1();
    } else {
        playing1 = false;
        document.getElementsByClassName("button-play1")[0].style.backgroundPosition = "-59px -44px";
        clearInterval(drawing1);
        resetImage1();
    }
}

function changeSpeed1() {
    if (playing1) {
        clearInterval(drawing1);
        initSort1();
    }
}


function resetImage1() {
    context1.clearRect(10, 10, canvas1.width - 20, canvas1.width - 20);
    drawArr1(arr1);
}

function compareRandom1(arr1) {
    var j, x;
    for (var i = arr1.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arr1[i - 1];
        arr1[i - 1] = arr1[j];
        arr1[j] = x;
    }
}

function calcNewArr1() {
    arr1 = [];
    for (var i = 0; i < +document.getElementById("elementsNumb1").value; i++) {
        arr1.push(Math.round(((canvas1.width / 2) - (75) - 59)));
    }
    for (i = 0; i < arr1.length; i++) {
        arr1[i] = arr1[i] * ((i) * ((0.64 / arr1.length))) + 90;
    }
    step1 = arr1.length - 2;
    time1 = 0;
    direction1 = true;
    compareRandom1(arr1);
    resetImage1();
}


function drawArr1(arr1) {
    context1.lineWidth = 2 * Math.PI * (75) / arr1.length;

    if (sortType1 === "combSort") {
        for (var i = 0; i < arr1.length; i++) {
            lineFunction1(false, i, colors1[0]);
            lineFunction1(false, time1 - 1, colors1[colorPick1]);
            lineFunction1(false, time1 + step1 - 1, colors1[colorPick1]);
            lineFunction1(true, i, colors1[2]);
        }
    }

}

function lineFunction1(pommel1, radCord, color) {

    if (sortView1 == "classicView") {
        context1.strokeStyle = color;
        context1.lineWidth = canvas1.width * 0.75 / arr1.length;
        if (pommel1) {
            context1.beginPath();
            context1.moveTo(radCord * (canvas1.width * 0.9 / arr1.length) + 30, canvas1.width / 2 - arr1[radCord]);
            context1.lineTo(radCord * (canvas1.width * 0.9 / arr1.length) + 30, canvas1.width / 2 - arr1[radCord] - canvas1.width * 0.8 / arr1.length);
            context1.stroke();
        } else {
            context1.beginPath();
            context1.moveTo(radCord * (canvas1.width * 0.9 / arr1.length) + 30, canvas1.width / 2);
            context1.lineTo(radCord * (canvas1.width * 0.9 / arr1.length) + 30, canvas1.width / 2 - arr1[radCord]);
            context1.stroke();
        }
    }
    if (sortView1 == "gradientView") {
        var gradientValue = canvas1.width / arr1.length + 50;
        context1.lineWidth = canvas1.width / arr1.length;
        if (time1 > 1) {
            context1.strokeStyle = colors1[2];
            context1.beginPath();
            if (sortType1 == "combSort") {
                context1.moveTo((time1 - 1) * (canvas1.width * 0.8 / arr1.length) + gradientValue, canvas1.width / 2 - 300);
                context1.lineTo((time1 - 1) * (canvas1.width * 0.8 / arr1.length) + gradientValue, canvas1.width / 2 - 300 - canvas1.width * 0.8 / arr1.length);
            }

            context1.stroke();

            context1.beginPath();
            if (sortType1 == "combSort") {
                context1.moveTo((time1 + step1 - 1) * (canvas1.width * 0.8 / arr1.length) + gradientValue, canvas1.width / 2 - 300);
                context1.lineTo((time1 + step1 - 1) * (canvas1.width * 0.8 / arr1.length) + gradientValue, canvas1.width / 2 - 300 - canvas1.width * 0.8 / arr1.length);
            }

            context1.stroke();
        }
        context1.strokeStyle = "hsla( 199, 17%, " + 100 * arr1[radCord] / 300 + "%, 1)";
        if (!pommel1) {
            context1.beginPath();
            context1.moveTo(radCord * (canvas1.width * 0.8 / arr1.length) + canvas1.width / arr1.length + 50, canvas1.width / 2);
            context1.lineTo(radCord * (canvas1.width * 0.8 / arr1.length) + canvas1.width / arr1.length + 50, canvas1.width / 2 - 300);
            context1.stroke();
        }
    }


}

function initSort1() {
    drawing1 = setInterval(sort1, Math.abs(+document.getElementById("codeSpeed1").value - 200));
}


function changeSortView1() {

    var selectBox1 = document.getElementById("selectBox1");
    var selectedValuw = selectBox1.options[selectBox1.selectedIndex].value;
    sortView1 = selectedValuw;

    resetImage1();
}

function sort1() {
    context1.clearRect(10, 10, canvas1.width - 20, canvas1.width - 20);


    if (sortType1 === "combSort") {
        if (arr1[time1] > arr1[time1 + step1]) {
            colorPick1 = 3;
        } else {
            colorPick1 = 1;
        }
        drawArr1(arr1);
        if (time1 + step1 >= arr1.length) {
            time1 = 0;
            step1 = (step1 == 1) ? step1 : Math.floor(step1 / 1.25);
        }
        if (arrLevel1 > arr1.length) {
            terminateProgram1();
        }
        for (var i = 0; i < arr1.length - 1; i++) {
            if (arr1[i] <= arr1[i + step1]) {
                arrLevel1++;
            } else {
                arrLevel1 = 0;
            }
        }
        if (time1 < arr1.length - 1 - arrLevel1) {
            if (arr1[time1] > arr1[time1 + step1]) {
                var temp = arr1[time1];
                arr1[time1] = arr1[time1 + step1];
                arr1[time1 + step1] = temp;
            }
            time1++;
        } else {
            time1 = 0;
        }
    }

}

function terminateProgram1() {
    clearInterval(drawing1);
    context1.clearRect(10, 10, canvas1.width - 20, canvas1.width - 20);
    time1 = 0;
    colorPick1 = 3;
    context1.lineWidth = 2 * Math.PI * (75) / arr1.length;
    for (var i = 0; i < arr1.length; i++) {
        lineFunction1(false, i, colors1[0]);
        lineFunction1(true, i, colors1[2]);
    }
    i = 0;
    var finishDrawing = setInterval(function () {
        if (i < arr1.length) {
            lineFunction1(false, i, colors1[1]);
            lineFunction1(true, i, colors1[5]);

        } else {
            clearInterval(finishDrawing);
            arrLevel1 = 0;
            arrLevelLow1 = 0;
            playing1 = false;
            document.getElementsByClassName("button-play1")[0].style.backgroundPosition = "-59px -44px";
        }
        i++;
    }, Math.abs(+document.getElementById("codeSpeed1").value - 200) * 0.7);
}

