function threeNumBookCipher() {
    let mainDiv = document.getElementById('three-num-book-cipher');
    let inputText = mainDiv.getElementsByClassName('input-book')[0].value;
    let inputCipher = mainDiv.getElementsByClassName('input-cipher')[0].value;
    let resultsElement = mainDiv.getElementsByClassName('result')[0];
    if (!(inputText && inputCipher)) {
        return;
    }
    console.log(mainDiv);
    console.log(inputText);
    console.log(inputCipher);
    console.log(resultsElement);
} 