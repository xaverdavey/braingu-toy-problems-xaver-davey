// Have the function BlackjackHighest(strArr) take the strArr parameter being passed which will be an array of numbers and letters representing blackjack cards. Numbers in the array will be written out. So for example strArr may be ["two","three","ace","king"]. The full list of possibilities for strArr is: two, three, four, five, six, seven, eight, nine, ten, jack, queen, king, ace. Your program should output below, above, or blackjack signifying if you have blackjack (numbers add up to 21) or not and the highest card in your hand in relation to whether or not you have blackjack. If the array contains an ace but your hand will go above 21, you must count the ace as a 1. You must always try and stay below the 21 mark. So using the array mentioned above, the output should be below king. The ace is counted as a 1 in this example because if it wasn't you would be above the 21 mark.

// Another example would be if strArr was ["four","ten","king"], the output here should be above king. If you have a tie between a ten and a face card in your hand, return the face card as the "highest card". If you have multiple face cards, the order of importance is jack, queen, king.

function blackjackHighest(strArr) {
  const values = {
    two : 2,
    three : 3,
    four : 4,
    five : 5,
    six : 6,
    seven : 7,
    eight : 8,
    nine : 9,
    ten : 10,
    jack : 10,
    queen : 10,
    king : 10,
    ace : 11,
  };
  let sum = 0;
  let maxCard = "two";
  let answer = "";
  for (let i = 0; i < strArr.length; ++i) {
    if (strArr[i] == "ace") {
      if (!onlyAceLeft(strArr, i)) {
        strArr.push(strArr[i]);
        continue;
      } else if (sum + 11 > 21) {
        sum += 1;
        continue;
      }
    }
    if (values[strArr[i]] > values[maxCard]) {
      maxCard = strArr[i];
    }
    sum += values[strArr[i]];
  }
  if (sum < 21) {
    answer += "below";
  } else if (sum > 21) {
    answer += "above";
  } else {
    answer += "blackjack";
  }
  return answer + " " + maxCard;
}

function onlyAceLeft(strArray, i) {
  for (let j = i + 1; j < i + 5 && j < strArray.length; ++j) {
    if (strArray[j] != "ace") {
      return false;
    }
  }
  return true;
}

module.exports = blackjackHighest;
