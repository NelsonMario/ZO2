let classifier;

let img = document.getElementById('file-preview');
let dropArea = document.getElementsByClassName('drop-area');



['dragenter', 'dragover'].forEach(eventName => {
    dropArea[0].addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea[0].addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
    dropArea[0].classList.add('highlight');
}

function unhighlight(e) {
    dropArea[0].classList.remove('highlight');
}

var imageLoader = document.getElementById('preview');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        $('.drop-area #photo-preview').attr('src',event.target.result).css("display", "block");
    }
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
        let image = loadImage(reader.result)
        classifier.classify(image, gotResult)
    }
    
}

function classifyImage() {
    classifier.predict(image, (err, results) => {
        if (err) {
            alert("Something went wrong");
        } else {
            let resultTxt = results[0].className;
            result.innerText = resultTxt;
            let prob = 100 * results[0].probability;
            probability.innerText = Number.parseFloat(prob).toFixed(2) + "%";
        };
    });
};


function setup() {
    classifier = ml5.imageClassifier('MobileNet', modelStatus);
}

function modelStatus(){
    console.log('Model is ready')
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    console.log('Label: ' + results[0].label);
    console.log('Confidence: ' + nf(results[0].confidence, 0, 2));
}