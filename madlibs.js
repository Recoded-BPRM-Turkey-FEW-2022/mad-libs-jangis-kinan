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
  // Your code here.
  // return {} // This line is currently wrong :)
  const result = [];
  const split = rawStory.split(" ");
  for (let i=0; i < split.length; i++) {
    const word = split[i];
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
  const previewView = document.querySelector(".madLibsPreview");
  const editView = document.querySelector('.madLibsEdit');

  const addSpaceToSpan = (element) => {
    const space = document.createElement("span");
    space.innerHTML = " ";
    element.appendChild(space);
  }

  for (let i=0; i < processedStory.length; i++) {
    const {word, pos} = processedStory[i];
    if (pos) {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = pos;

      const span = document.createElement("span");
      span.innerText = pos;

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
      const normalWordsEditView = document.createElement("span");
      normalWordsEditView.innerText = word;

      const normalWordsPreviewView = document.createElement("span");
      normalWordsPreviewView.innerText = word;

      editView.appendChild(normalWordsEditView);
      previewView.appendChild(normalWordsPreviewView);
    }

    addSpaceToSpan(editView);
    addSpaceToSpan(previewView);

  }

});

function buttonsFunction() {
  const button = document.querySelector('button#enter');
  button.addEventListener('click', function (e) {
    document.getElementById('entrance').style.display = "none";
  })
  button.addEventListener("mouseover", function () {
    button.style.cursor = "pointer";
  })
}

buttonsFunction();
