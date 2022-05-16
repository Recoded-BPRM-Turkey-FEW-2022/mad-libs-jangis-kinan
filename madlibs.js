/**
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */


function parseStory(rawStory) {
  // Working with regex and returning a list of objects
  // We first create an empty array to add objects to it
  const result = [];
  // Wherever there's a space (" "), we'll split the text file into words
  const split = rawStory.split(" ");
  for (let i=0; i < split.length; i++) {
    const word = split[i];
    // Using regex, words that contain [n], will be pushed as an object with two keys
    // first key is word and its value is the word itself, but without [n].
    // second key is pos and its value is "noun".
    // We'll apply the same method to words that contain [v] and [a].
    if ((/\[n\]/).test(word) === true) {
      result.push({
        word: word.replace("[n]", ""),
        pos: "noun"
      })
    } else if ((/\[a\]/).test(word) === true) {
      result.push({
        word: word.replace("[a]", ""),
        pos: "adjective"
      })
    } else if ((/\[v\]/).test(word) === true) {
      result.push({
        word: word.replace("[v]", ""),
        pos: "verb"
      })
    } else {
      // In this condition, every word that doesn't have any [n], [v] or [a], it will be returned as an object without pos.
      result.push({
        word: word
      });
    }
  }

  return result;
}


/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */


getRawStory().then(parseStory).then((processedStory) => {

  const editView = document.querySelector('.madLibsEdit');
  const previewView = document.querySelector(".madLibsPreview");

  // To add spaces between spans (words) in both previewView and editView
  const addSpaceToSpan = (element) => {
    const space = document.createElement("span");
    space.innerHTML = " ";
    element.appendChild(space);
  }

  // Live Update
  for (let i=0; i < processedStory.length; i++) {
    // Using destructing to each object inside the result array from pasreStory.
    const {word, pos} = processedStory[i];
    // First if condition is dealing with objects that include a pos key
    if (pos) {
      // We're defining the input attributes that will be added to the editView (left box). including maximum of 20 characters.
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = pos;
      input.maxLength = '20';

      // We're defining the spans that will be added to the previewView (right box).
      const span = document.createElement("span");
      span.innerText = pos;

      // We're creating an event listener to each input.
      // If the value added to the input = 0 (nothing is added yet), the return text in the previewView will be the pos value.
      // Else, the return text in previewView will be the same as the one written in the input in the editView.
      input.addEventListener('input', updateValue);
      function updateValue(event) {
        if (event.target.value.length === 0) {
          span.innerText = pos;
        } else {
          span.innerText = event.target.value;
        }
      }

      editView.appendChild(input);
      previewView.appendChild(span);
      

    } else {
      // Second if condition is dealing with objects that doesn't include a pos key
      // We'll add span elements with the same word value in both editView and previewView
      const normalWordsEditView = document.createElement("span");
      normalWordsEditView.innerText = word;

      const normalWordsPreviewView = document.createElement("span");
      normalWordsPreviewView.innerText = word;

      editView.appendChild(normalWordsEditView);
      previewView.appendChild(normalWordsPreviewView);
    }

    // Calling addSpaceToSpan function to both editView and previewView
    addSpaceToSpan(editView);
    addSpaceToSpan(previewView);

  }

});


// Creating a click event listener to the entrance button that makes it disappear by clicking it.
// Another hover event listener to change the mouse cursor to a pointer
function enterButton() {
  const button = document.querySelector('button#enter');
  button.addEventListener('click', function (e) {
    document.getElementById('entrance').style.display = "none";
  })
  button.addEventListener("mouseover", function () {
    button.style.cursor = "pointer";
  })
}

enterButton();


// Creating a click event listener to the reset button that reset all inputs.
// Another hover event listener to change the mouse cursor to a pointer
function resetButton() {
  const textInputs = document.getElementsByTagName("input");
  const button = document.getElementById("reset-btn");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    for (let i = 0; i < textInputs.length; i++) {
      textInputs[i].value = "";
    }
  });
  button.addEventListener("mouseover", function () {
    button.style.cursor = "pointer";
  })
}

resetButton();


