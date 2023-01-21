
let practiceTests = [
  { A: "Mike hates all types of fruit or Mike's favorite food is watermelon.", B:"Based on the sentence, how possible is it that Mike hates all types of fruit and Mike's favorite food is watermelon?", Explanation: "This is an example of an item that has an objectively correct answer. Since it's impossible to hate all fruit and have watermelon be your favorite food, the correct answer here is all the way at the left end of the slider."},
  { A: "My favorite color is a primary color or is yellow, red, or blue.", B:"Based on the sentence, how possible is it that the speaker's favorite color is both a primary color and is yellow, red, or blue?" , Explanation: "Here's another item with a correct answer. Since yellow red and blue are the only primary colors, the correct answer here is all the way at the right end of the slider, since the two options mean the same thing."},
  { A: "David is a bachelor or is married.", B:'Based on the sentence, how possible is it that David is both a bachelor and married?', Explanation: "It's impossible to be both married and a bachelor! The best answer is all the way at the far left end of the slider." },
  { A: "Feel free to take a free T-shirt or hat.", B: "Based on the sentence, how possible is it that the speaker meant you could take both a T-shirt and a hat?", Explanation: "There isn't a 'right' answer here, so just answer based on your intuitions. (Most trials in the experiment will be like this one.)"}
]

let GIST_LINK = 'https://gist.githubusercontent.com/cdfelton/2d813e89cddc55f735872dad6ba62e84/raw/5150096d441f05662e706ed5a69f4226431642db/stimuli_2.json';
let stimuli;
userResult = [];
let sliderMoved = false;
var item;
let originalLength;

init();

function Result(id, chance) {
  this.id = id;
  this.chance = chance;
}


function init() {
  fetch(GIST_LINK)
    .then(results => {
      return results.json();
    })
    .then(data => {
      stimuli = data;
      stimuli = shuffle(stimuli);
      originalLength = stimuli.length;
      console.log(stimuli)
    });

}

function set(target, val) {
  sliderMoved = true;
  // document.getElementById(target).innerHTML = document.getElementById(val).value;
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}


function clearError() {
  document.getElementById('error').style = 'display:none';
}
function setError(error) {
  document.getElementById('errorMessage').innerHTML = error;
  document.getElementById('error').style = '';
}
function goToConsent() {
  document.getElementById('startScreen').style = 'display:none';
  document.getElementById('consentForm').style = '';
}
function goToPractice() {
  if (document.getElementById('consentCheck').checked) {
    document.getElementById('consentForm').style = 'display:none';
    document.getElementById('practiceIntro').style = '';
    clearError();
  }
  else {
    setError("Please check the consent box to proceed to the experiment");
    // Show some error thing asking them to check consent form
  }
}
function startPractice() {
  document.getElementById('practiceIntro').style = 'display:none';
  document.getElementById('practiceTestFrame').style = '';
  clearError();
  item = practiceTests.shift();
  document.getElementById('pracRowOne').innerHTML = item.A;
  document.getElementById('pracRowTwo').innerHTML = item.B;


}

function submitPractice() {



  if (!sliderMoved) {
    setError("Please move the slider");
  }
  else {

    document.getElementById('submitPractice').style = 'display:none';
    document.getElementById('showNextPractice').style = '';
    setError(item.Explanation);
  }
}
function showNextPractice() {
  clearError();
  if (practiceTests.length == 0) {
    return endPractice();
  }
  document.getElementById('submitPractice').style = '';
  document.getElementById('showNextPractice').style = 'display:none';
  document.getElementById('pracOne').value = 50;
  sliderMoved = false;
  item = practiceTests.shift();
  document.getElementById('pracRowOne').innerHTML = item.A;
  document.getElementById('pracRowTwo').innerHTML = item.B;
}

function endPractice() {
  document.getElementById('practiceTestFrame').style = 'display:none';
  document.getElementById('realIntro').style = '';
  clearError();
}

function startReal() {

  document.getElementById('realIntro').style = 'display:none';
  document.getElementById('realTestFrame').style = '';
  populateTest();
  clearError();
}

function populateTest() {
  document.getElementById('realOne').value = 50;
  // document.getElementById('valOne').innerHTML = 50;
  sliderMoved = false;
  item = stimuli.shift();
  document.getElementById('realRowOne').innerHTML = item.Disjunction;
  document.getElementById('realRowTwo').innerHTML = item.Question;
}

function submitReal() {
  if (stimuli.length == 0) { // check to see if we are out of stimuli
    userResult.push(new Result(item.ID,
      document.getElementById('realOne').value
    ));
    console.log(userResult)
    console.log(JSON.stringify(userResult))
    proliferate.submit({"trials": userResult})
    document.getElementById('completionScreen').style = '';
    document.getElementById('realTestFrame').style = 'display:none';
  }
  else {
    if (!sliderMoved) {
      setError("Please move the slider");
    }
    else {
      document.getElementById('progressbar').style.width = 100*(originalLength - stimuli.length)/originalLength + "%";
      console.log(item);
      userResult.push(new Result(item.ID,
        document.getElementById('realOne').value
      ));
      console.log(userResult);
      populateTest();
      clearError();
    }
  }
}
