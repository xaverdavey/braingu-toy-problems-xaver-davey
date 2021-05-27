// Have the function Calculator(str) take the str parameter being passed and evaluate the mathematical expression within in. For example, if str were "2+(3-1)*3" the output should be 8.
// Another example: if str were "(2-0)(6/2)" the output should be 6. There can be parenthesis within the string so you must evaluate it properly according to the rules of arithmetic.
// The string will contain the operators: +, -, /, *, (, and ). If you have a string like this: #/#*# or #+#(#)/#, then evaluate from left to right. So divide then multiply, and for the second one multiply, divide, then add. The evaluations will be such that there will not be any decimal operations, so you do not need to account for rounding and whatnot.

function calculator(str) {

  var i; // variable for iteration
  var operands = []; // contains operands (as stings) in order
  var operators = []; // contains operators (as strings) in order

  str = "@" + str;

  for (i = 0; i < str.length; ++i) {

    // handle operators
    if (str.charAt(i) === '(') { // bracket multiplication sytnax
      operators.push('*');
    } else {
      operators.push(str.charAt(i));
      ++i;
    }

    // handle operands
    if (str.charAt(i) === '(') { // if bracket operand
      var substring = getBracketContents(str, i + 1);
      i += substring.length + 1;
      substring = calculator(substring);
    } else { // if positive operand
      var substring = getNumber(str, i);
      i += substring.length - 1;
    }
    operands.push(substring);

  }

  // first go through multiplication and divison
  for (i = 0; i < operators.length; ++i) {
    if (operators[i] === '*' || operators[i] === '/') {
      operands[i - 1] = calculate(operators[i], operands[i - 1], operands[i]);
      operators.splice(i, 1);
      operands.splice(i, 1);
      --i;
    }
  }

  // then go through addition and subtraction
  for (i = 0; i < operators.length; ++i) {
    if (operators[i] === '+' || operators[i] === '-') {
      operands[i - 1] = calculate(operators[i], operands[i - 1], operands[i]);
      operators.splice(i, 1);
      operands.splice(i, 1);
      --i;
    }
  }

  return parseInt(operands[0]);

}




function getNumber(str, i) {
  var number = "";
  if (str.charAt(i) === '-') {
    number += '-';
    ++i;
  }
  while (str.charAt(i) >= '0' && str.charAt(i) <= '9') {
    number += str.charAt(i);
    ++i;
  }
  return number;
}




function getBracketContents(str, i) {
  var result = "";
  var numEmbeddedBrackets = 0;
  while (str.charAt(i) !== ')' || numEmbeddedBrackets !== 0) {
    if (str.charAt(i) === '(') {
      ++numEmbeddedBrackets;
    } else if (str.charAt(i) === ')') {
      --numEmbeddedBrackets;
    }
    result += str.charAt(i);
    ++i;
  }
  return result;
}




function calculate(operation, operandA, operandB) {
  var result;
  var a = parseInt(operandA);
  var b = parseInt(operandB);
  if (operation === '*') {
    result = a * b;
  } else if (operation === '/') {
    result = a / b;
  } else if (operation === '+') {
    result = a + b;
  } else if (operation === '-') {
    result = a - b;
  }
  return result.toString();
}




module.exports = calculator;
