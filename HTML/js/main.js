
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
let stimuli;
index = 0;
length = 2;
userResult = [];
practiceStarted = false;
var item;
init();

function Result(id, Disjunct_A, Disjunct_B, Conjunction) {
  this.id = id;
  this.Disjunct_A = Disjunct_A;
  this.Disjunct_B = Disjunct_B;
  this.Conjunction = Conjunction;
}


function init() {
  fetch('https://gist.githubusercontent.com/cdfelton/29146ad08f5e45f8283fc9331afb61a6/raw/22b7d150b8888479c735b9e42fed379ecec7e2c1/stimuli.json')
    .then(results => {
      return results.json();
    })
    .then(data => {
      // console.log(data);
      stimuli = data;
      // console.log("data");
      // console.log(stimuli[0]);
      stimuli = shuffle(stimuli);
      // console.log("stimuli");
      // console.log(stimuli);
    });
  // console.log(stimuli);
  tests = formatCSV(tests);
  tests = shuffle(tests);
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

function formatCSV(list) {
  list.splice(0, 4);
  newList = [];
  element = [];
  counter = 0;
  for (let i = 0; i <= list.length; i++) {
    if (counter == 4) {
      counter = 0;
      newList.push(element);
      element = [];
    }
    element.push(list[i]);
    counter++;
  }
  console.log(newList);
  return newList;
}

function goToConsent() {
  document.getElementById('startScreen').style = 'display:none';
  document.getElementById('consentForm').style = '';
}
function startPractice() {
  if (document.getElementById('consentCheck').checked) {
    document.getElementById('consentForm').style = 'display:none';
    document.getElementById('practiceTestFrame').style = '';

    practiceStarted = true;
  }
  else {
    // Show some error thing asking them to check consent form
  }
}

function submitPractice(test, message) {
  console.log("pracc sub");
  if (index >= length) {
    endPractice();
  }
  if (true) { // see if they have moved the slider

    document.getElementById('practiceRange').style = '';
    document.getElementById('practiceSentence').innerHTML = tests[index][1];
    console.log(document.getElementById('practiceRange').value);
    index++;
  }
  else { // ask them to move the slider

  }
}

function endPractice() {
  document.getElementById('practiceTestFrame').style = 'display:none';
  document.getElementById('realIntro').style = '';
}

function startReal() {
  index = 0;

  document.getElementById('realIntro').style = 'display:none';
  document.getElementById('realTestFrame').style = '';
  populateTest();
}

function populateTest() {
  item = stimuli.shift();
  document.getElementById('realRowOne').innerHTML = item.Disjunct_A;
  document.getElementById('realRowTwo').innerHTML = item.Disjunct_B;
  document.getElementById('realRowThree').innerHTML = item.Conjunction;

}

function submitReal(test, message) {
  console.log(item);
  userResult.push(new Result(item.ID,
    document.getElementById('realOne').value,
    document.getElementById('realTwo').value,
    document.getElementById('realThree').value
  ));
  console.log(userResult);
  index++;
  populateTest();
}
