
let practiceTests = [
  { A: "Joaquin is a world class fencer.", B: "Joaquin fenced in the olympics.", Explanation: "joaquin is cool" },
  { A: "Mike is terrible at bowling.", B: "Mike got four strikes in a row.", Explanation: "mike is not cool" },
  { A: "There was thunder.", B: "There was lightning.", Explanation: "Thor makes lightinnnnnnng and thunder :)" },
  { A: "David is a bachelor.", B: "David is married.", Explanation: "David is not funny" }
]

let GIST_LINK = 'https://gist.githubusercontent.com/cdfelton/29146ad08f5e45f8283fc9331afb61a6/raw/a7e061fc587c8d3bbfebf21368500cb39d599222/stimuli.json';
let stimuli;
userResult = [];
let sliderMoved = false;
var item;

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
    setError("Please check the consent form to proceed to the experiment");
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
  document.getElementById('realRowOne').innerHTML = item.Disjunct_A;
  document.getElementById('realRowTwo').innerHTML = item.Disjunct_B;
}

function submitReal() {
  if (stimuli.length == 0) { // check to see if we are out of stimuli
    document.getElementById('completionScreen').style = '';
    document.getElementById('realTestFrame').style = 'display:none';
  }
  else {
    if (!sliderMoved) {
      setError("Please move the slider");
    }
    else {
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
