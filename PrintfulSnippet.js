const outsideLabelFilename = "LABEL_FILE_NAME";

const labelType = {
    OUTSIDE : 2,
    INSIDE : 3    
}

const chosenLabelType = labelType.OUTSIDE;
const fromRow = 0;
let rows = document.querySelectorAll(".sync-row-selector");


function removeBackdrop() {
    var backdropEl = document.getElementsByClassName("modal-backdrop");

    if(backdropEl){
        backdropEl[0].className = backdropEl[0].className.replace("modal-backdrop fade in",'');  
    } 
}

//https://stackoverflow.com/questions/40328932/javascript-es6-promise-for-loop
(function loop(i) {
    const promise = new Promise((resolve, reject) => {
        if(i==0 || (fromRow > 0 && i <= fromRow)){
            console.log(`${i} of ${rows.length-1}`);
            resolve();
        } else {
            rows[i].click();
            tryGetLabelElement().then((labelElement) => {
                tryClickNewLabelButton(labelElement).then(()=>{
                    removeBackdrop();
                    tryGetLabelsFromFilePicker().then((labels)=>{
                           removeBackdrop();
                           tryChooseNewLabel(labels).then(()=>{
                                tryClickContinue().then(() => {
                                    console.log(`${i} of ${rows.length-1}`);
                                    resolve();
                                });
                           });
                        });
                    });
            });
        }
    }).then( () => i >= rows.length-1 || loop(i+1) );
})(0);

function tryGetLabelElement() {

    let labelElement = new Promise((resolve, reject) => {
        getLabelElement(resolve);
    });

    return labelElement;
}


function getLabelElement(resolve){
    let labelElement = document.querySelectorAll(".file-selector .file-selector__item .file-selector__overlay")[chosenLabelType];
    if(!labelElement){
        setTimeout(() => getLabelElement(resolve), 1000);
    } else {
        resolve(labelElement);
    }
}

function tryClickNewLabelButton(labelElement) {
    let clickNewLabelButton = new Promise((resolve, reject) => {   
        let chooseOrChangeButton = labelElement.childNodes[0];

        if(chooseOrChangeButton.textContent === "Choose file" ||
        chooseOrChangeButton.textContent === "Change file"){
            chooseOrChangeButton.click();
            resolve();
        } else {
            reject();
        }
    });

    return clickNewLabelButton;
}

function tryGetLabelsFromFilePicker() {

    let labelsFromFilePicker = new Promise((resolve, reject) => {
        getLabelsFromFilePicker(resolve);
    });

    return labelsFromFilePicker;
}

function getLabelsFromFilePicker(resolve){
    let labels = document.querySelectorAll(`.item .overlay`);
    if(!labels || (labels && labels.length === 0)){
        setTimeout(() => getLabelsFromFilePicker(resolve), 1000);
    } else {
        resolve(labels);
    }
}

function tryChooseNewLabel(labels){
    let findLabels = new Promise((resolve, reject) => {
        labels.forEach((label) => {
                let chooseButton = label.querySelector(".btn.btn-default.choose");
                let overlayLabel = label.querySelector(`.item div[title="${outsideLabelFilename}"]`);

                if(overlayLabel && overlayLabel.textContent === outsideLabelFilename){
                    chooseButton.click();
                    resolve();
                 }
            });

            reject();
        });
    return findLabels;
}

function tryClickContinue() {
    let clickContinue =new Promise((resolve, reject) => {
        let continueButton = document.querySelector(`.btn-danger`);

        if(continueButton){
            continueButton.click();
        }

        resolve();
    });

    return clickContinue;
}
