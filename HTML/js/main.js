
let tests = ["ID", "Disjunct_A", "Disjunct_B", "Conjunction",
  1, "John brought pizza to the party.", "John brought pasta to the party.", "John brought pizza and pasta to the party.",
  2, "I’d like flowers.", "I’d like champagne.", "I’d like flowers and champagne.",
  3, "If we hire Mary, everything will go well. ", "If we hire Sue, everything will go well. ", "If we hire Mary and Sue, everything will go well."];

// fetch('https://gist.githubusercontent.com/cdfelton/29146ad08f5e45f8283fc9331afb61a6/raw/22b7d150b8888479c735b9e42fed379ecec7e2c1/stimuli.json')
//   .then(results => {
//     return results.json();
//   })
//   .then(data => {
//     stimuli = data;
// });
let GIST_LINK = 'https://gist.githubusercontent.com/cdfelton/29146ad08f5e45f8283fc9331afb61a6/raw/a7e061fc587c8d3bbfebf21368500cb39d599222/stimuli.json';
let stimuli;
index = 0;
length = 2;
userResult = [];
practiceStarted = false;
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
    });
  // tests = formatCSV(tests);
  // tests = shuffle(tests);
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

// function formatCSV(list) {
//   list.splice(0, 4);
//   newList = [];
//   element = [];
//   counter = 0;
//   for (let i = 0; i <= list.length; i++) {
//     if (counter == 4) {
//       counter = 0;
//       newList.push(element);
//       element = [];
//     }
//     element.push(list[i]);
//     counter++;
//   }
//   console.log(newList);
//   return newList;
// }
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
function startPractice() {
  if (document.getElementById('consentCheck').checked) {
    document.getElementById('consentForm').style = 'display:none';
    document.getElementById('practiceTestFrame').style = '';
    clearError();
    practiceStarted = true;
  }
  else {
    setError("Please check the consent form to proceed to the experiment");
    // Show some error thing asking them to check consent form
  }
}

function submitPractice(test, message) {
  console.log("pracc sub");
  if (index >= length) {
    endPractice();
  }
  if (true) { // see if they have moved the slider

    // document.getElementById('practiceRange').style = '';
    // document.getElementById('practiceSentence').innerHTML = tests[index][1];
    // console.log(document.getElementById('practiceRange').value);
    index++;
    clearError();
  }
  else { // ask them to move the slider

  }
}

function endPractice() {
  document.getElementById('practiceTestFrame').style = 'display:none';
  document.getElementById('realIntro').style = '';
  clearError();
}

function startReal() {
  index = 0;

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
      // index++;
      populateTest();
      clearError();
    }


  }

}
