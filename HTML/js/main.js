let tests = [['a',1],'b','c','d','e','f','g','h','i','j','k'];
index = 0;
length = 10;

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

function goToConsent(){
  document.getElementById('startScreen').style='display:none';
  document.getElementById('consentForm').style='';

}
function startPractice(){
  if(document.getElementById('consentCheck').checked){
    console.log(tests);
    document.getElementById('consentForm').style='display:none';
    document.getElementById('practiceTestFrame').style='';
    tests = shuffle(tests);
    console.log(tests);
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
    document.getElementById('practiceSentence').innerHTML = tests[index]; // clear plots in case one is already there
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
