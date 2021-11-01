const THREE_NUM_BOOK_CIPHER_ID = "three-num-book-cipher";

// cipher logic

function threeNumBookCipher() {
  let mainDiv = document.getElementById(THREE_NUM_BOOK_CIPHER_ID);
  let book = mainDiv.getElementsByClassName("input-book")[0].value;
  let cipher = mainDiv.getElementsByClassName("input-cipher")[0].value;
  let resultsElement = mainDiv.getElementsByClassName("result")[0];
  if (!(book && cipher && resultsElement)) {
    return;
  }
  let bookRows = [];
  resultsElement.textContent = "";
  book.split("\n").forEach((row) => {
    bookRows.push(row);
  });
  cipher.split("\n").forEach((row) => {
    let newWord = "";
    row.split(" ").forEach((x) => {
      if (!x.trim()) {
        return;
      }
      threeNums = x.split("/");
      if (bookRows[threeNums[0] - 1].indexOf(" ") > -1) {
        // only enter when the book row has spaces (words)
        newWord +=
          bookRows[threeNums[0] - 1].split(" ")[threeNums[1] - 1][
            threeNums[2] - 1
          ];
      } else {
        newWord += bookRows[threeNums[0] - 1][threeNums[2] - 1];
      }
    });
    resultsElement.appendChild(document.createTextNode(newWord));
    resultsElement.appendChild(document.createElement("br"));
  });
}

// end cipher logic

// Saves stuff

function saveThreeNumBookCipher() {
  let mainDiv = document.getElementById(THREE_NUM_BOOK_CIPHER_ID);
  let inputText = mainDiv.getElementsByClassName("input-book")[0].value;
  let inputCipher = mainDiv.getElementsByClassName("input-cipher")[0].value;
  let resultsElement = mainDiv.getElementsByClassName("result")[0];
  newSave = {
    timestamp: Date.now(),
    savedInputs: [
      {
        className: "input-book",
        value: inputText,
      },
      {
        className: "input-cipher",
        value: inputCipher,
      },
      {
        className: "result",
        value: resultsElement.value,
      },
    ],
  };
  let previousSave = localStorage.getItem(THREE_NUM_BOOK_CIPHER_ID);
  if (previousSave) {
    let oldSave = JSON.parse(previousSave);
    oldSave.push(newSave);
    localStorage.setItem(THREE_NUM_BOOK_CIPHER_ID, JSON.stringify(oldSave));
  } else {
    localStorage.setItem(THREE_NUM_BOOK_CIPHER_ID, JSON.stringify([newSave]));
  }
  populateSavesDropdown(THREE_NUM_BOOK_CIPHER_ID);
}

function loadSave(mainDiv, saveData) {
  saveData.savedInputs.forEach((savedInput) => {
    if (savedInput.className) {
      mainDiv.getElementsByClassName(savedInput.className)[0].value =
        savedInput.value;
    }
  });
}

function loadSelectedSave(saveId) {
  let saveData = JSON.parse(localStorage.getItem(saveId));
  if (!saveData) {
    return;
  }
  let mainDiv = document.getElementById(saveId);
  let dropdown = mainDiv.getElementsByClassName("previousSaves")[0];
  let selectedTimestamp = Number(
    dropdown.options[dropdown.selectedIndex].value
  );
  if (!selectedTimestamp) {
    return;
  }
  let selectedSaves = saveData.filter((save) => {
    return save.timestamp === selectedTimestamp;
  });
  loadSave(mainDiv, selectedSaves[0]); // just gets the first of the matching saves, probably unlikely to ever collider unless you save multiple times per second
}

function populateSavesDropdown(saveId) {
  let saveData = JSON.parse(localStorage.getItem(saveId));
  if (!saveData) {
    return;
  }
  let mainDiv = document.getElementById(saveId);
  let dropdown = mainDiv.getElementsByClassName("previousSaves")[0];
  dropdown.replaceChildren(); // remove anything there currently
  saveData.forEach((save) => {
    let localTimestamp = new Date(save.timestamp).toLocaleTimeString("en-US");
    let option = document.createElement("option");
    option.innerHTML = localTimestamp;
    option.value = save.timestamp; // the value of the dropdown is the timestamp
    dropdown.options.add(option);
  });
}

function deleteSaves(saveId) {
  if (confirm(`Are you sure you want to delete all saves for ${saveId}?`)) {
    localStorage.removeItem(saveId);
    let mainDiv = document.getElementById(saveId);
    let dropdown = mainDiv.getElementsByClassName("previousSaves")[0];
    dropdown.replaceChildren(); // remove anything there currently
  }
}

window.onload = function () {
  populateSavesDropdown(THREE_NUM_BOOK_CIPHER_ID);
};

// end saves stuff
