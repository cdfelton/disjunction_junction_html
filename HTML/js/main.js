
let practiceTests = [
  { A: "Mike hates all types of fruit.", B: "Mike's favorite food is watermelon.", C:'How likely is it that someone both hates all fruit and has watermelon as their favorite food?', Explanation: "Since it's impossible to hate all fruit and have watermelon be your favorite food, the correct answer here is all the way at the left end of the slider."},
  { A: "Joaquin is a world class basketball player.", B: "Joaquin plays in the NBA.", C:'How likely is it that someone is both a world class basketball player and plays in the NBA?', Explanation: "In this example, while any given individual is unlikely to be either an NBA player or a world class athlete, it is pretty likely (but not required) for someone who is a world class basketball player to play in the NBA and vice versa. The best answer is somewhere in the middle of the right side of the slider." },
  { A: "My favorite color is a primary color.", B: "My favorite color is yellow, red, or blue.", C:"How likely is it that my favorite color both is a primary color and is yellow, red, or blue?" , Explanation: "Since yellow red and blue are the only primary colors, the correct answer here is all the way at the right end of the slider, since these two sentences must both be true if one is true."},
  { A: "Mike is terrible at bowling.", B: "Mike got four strikes in a row.", C:'How likely is it that someone is both terrible at bowling and got four strikes in a row?', Explanation: "While plenty of people have bowled four strikes in a row, it is pretty unlikely for someone who is a terrible bowler to do so. The best answer is in the middle of the left side of the slider." },
  { A: "Felix is a pianist.", B: "Casey enjoys video games.", C:'How likely is it that someone is a pianist and someone else enjoys video games?', Explanation: "There isn't really any clear relationship between someone being a pianist and another person enjoying video games. The correct answer is somewhere near the middle of the slider. (You can even put it right in the middle if you want, just move the slider back to the center after dragging it a bit!)"},
  { A: "Joseph turned the key in the car ignition.", B: "The car turned on.", C:'How likely is it that someone both turned the key in the car ignition and the car turned on?', Explanation: "The correct answer here is somewhere in the middle of the right half of the slider, as these two events usually co-occur, but don't always (maybe the car is out of gas, or doesn't require a key)."},
  { A: "There was thunder.", B: "There was lightning.", C:'How likely is it that there was both thunder and lightning?', Explanation: "Depending on where you live, thunder and lightning might be rare, but they are very likely to occur together when they happen. The best answer is all the way at the far right end of the slider." },
  { A: "Ken was unhappy with the restaurant's service.", B: "Ken left a large tip.", C:"How likely is it that someone was both unhappy with a restaurant's service and left a large tip?", Explanation: "The correct answer here is somewhere in the middle of the left half of the slider, since Ken is unlikely to tip well if the service was bad, but might decide to anyway if he felt generous."},
  { A: "Masoud and Santiago play football together.", B: "John and Jack went shopping for new guitars.", C:'How likely is it that two people play football together and two other people went shopping for new guitars?', Explanation: "It's hard to tell what relationship, if any, there is between these two things. The best answer is somewhere near the middle of the slider."},
  { A: "David is a bachelor.", B: "David is married.", C:'How likely is it that someone is both a bachelor and married?', Explanation: "It's impossible to be both married and a bachelor! The best answer is all the way at the far left end of the slider." }
]

let GIST_LINK = 'https://gist.githubusercontent.com/cdfelton/29146ad08f5e45f8283fc9331afb61a6/raw/02730d9ba61fbcfd05c1ce4df6659c2b04a90c5a/stimuli.json';
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
  document.getElementById('pracRowThree').innerHTML = item.C;


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
  document.getElementById('pracRowThree').innerHTML = item.C;
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
  document.getElementById('realRowOne').innerHTML = item.Disjunct_A;
  document.getElementById('realRowTwo').innerHTML = item.Disjunct_B;
  document.getElementById('realRowThree').innerHTML = item.Question;
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
