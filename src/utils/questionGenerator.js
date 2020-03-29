function generator(dataArray, length = 10) {
  return new Promise((resolve, reject) => {
    if (typeof dataArray === 'undefined') reject('You must pass an array of data');

    const questionLength = twoSum(length);
    const shuffleArray = shuffle(dataArray);
    const questionType = ['title', 'meaning'];
    const res = questionLength.map((length, index) => {
      return questions(shuffleArray.splice(0, length), questionType[index]);
    });

    resolve(shuffle(res.flat()));
  });
}

/*
	author: Yong Lian
	https://dev.to/yongliang24/solve-the-two-sum-problem-with-javascript-4jlk
*/
function twoSum(target) {
  const numArray = new Array(target).fill().map((i, index) => (index += 1));
  const comp = {};
  for (const eachNum in numArray) {
    const otherNum = target - numArray[eachNum];
    if (otherNum in comp) {
      return [otherNum, numArray[eachNum]];
    }
    comp[numArray[eachNum]] = eachNum;
  }
  return 'target not found';
}
/*--------------------------------------------------------------------------------*/

function questions(dataArray, type) {
  const answer = type === 'title' ? 'meaning' : 'title';
  const questions = dataArray.map(word => {
    const options = [word[answer]];
    while (options.length < 3) {
      const { meaning: wordMeaning, title: wordTitle } = getRandomVal(dataArray);

      if (type === 'title' && !options.includes(wordMeaning) && wordMeaning !== word[type]) options.push(wordMeaning);
      else if (type === 'meaning' && !options.includes(wordTitle) && wordTitle !== word[type]) options.push(wordTitle);
    }
    return {
      type,
      question: word[type],
      answer: word[answer],
      options: shuffle(options),
    };
  });
  return shuffle(questions);
}

/*
    Code: https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
*/
function shuffle(arr) {
  let ctr = arr.length;
  let temp;
  let index;

  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arr[ctr];
    arr[ctr] = arr[index];
    arr[index] = temp;
  }
  return arr;
}
/*---------------------------------------------------------*/

function getRandomVal(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default generator;
