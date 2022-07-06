
let tests = ["ID","Disjunct_A","Disjunct_B","Conjunction",
  1,"John brought pizza to the party.","John brought pasta to the party.","John brought pizza and pasta to the party.",
  2,"I’d like flowers.","I’d like champagne.","I’d like flowers and champagne.",
  3,"If we hire Mary, everything will go well. ","If we hire Sue, everything will go well. ","If we hire Mary and Sue, everything will go well."];
index = 0;
length = 3;
userResult = [];
practiceStarted = false;
init();




function init(){
  tests = formatCSV(tests);
  tests = shuffle(tests);
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

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

function formatCSV(list){
  list.splice(0,4);
  newList = [];
  element = [];
  counter = 0;
  for(let i = 0; i <= list.length; i++){
    if(counter == 4){
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

function goToConsent(){
  document.getElementById('startScreen').style='display:none';
  document.getElementById('consentForm').style='';

}
function startPractice(){
  if(document.getElementById('consentCheck').checked){
    document.getElementById('consentForm').style='display:none';
    document.getElementById('practiceTestFrame').style='';
    
    practiceStarted = true;
  }
  else{
// Show some error thing asking them to check consent form
  }
}

function submitPractice(test, message) {
  if(index>=length){
    return 0;
  }
  if(true){ // see if they have moved the slider
    
    document.getElementById('practiceRange').style='';
    userResult.push(document.getElementById('practiceRange').value);
    document.getElementById('practiceSentence').innerHTML = tests[index][1];
    console.log(document.getElementById('practiceRange').value);
    index++;
  }
  else{ // ask them to move the slider

  }
}

function submitReal(test, message) {
  document.getElementById('plot').innerHTML = ''; // clear plots in case one is already there
  actual = test();
  q.innerHTML = message;
  qnum.innerHTML = 'Question '+(testver*trialsPerTest+trial+1)+'/'+trialsPerTest*tests.length+''
}
