// Have the function RomanNumeralReduction(str) read str which will be a string of roman numerals in decreasing order. The numerals being used are: I for 1, V for 5, X for 10, L for 50, C for 100, D for 500 and M for 1000.
// Your program should return the same number given by str using a smaller set of roman numerals. For example: if str is "LLLXXXVVVV" this is 200, so your program should return CC because this is the shortest way to write 200 using the roman numeral system given above. If a string is given in its shortest form, just return that same string.

function romanNumeralReduction(str) {
  return decimalToRoman(romanToDecimal(str));
}

function romanToDecimal(str) {
  const dict = {
    'I' : 1,
    'V' : 5,
    'X' : 10,
    'L' : 50,
    'C' : 100,
    'D' : 500,
    'M' : 1000,
  };
  let sum = dict[str.charAt(0)];
  if (dict[str.charAt(0)] < dict[str.charAt(1)]) {
    sum *= -1;
  }
  for (let i = 1; i < str.length - 1; ++i) {
    sum += dict[str.charAt(i)];
    if (dict[str.charAt(i)] < dict[str.charAt(i)]) {
      sum *= -1
    }
  }
  if (str.length > 1) {
    sum += dict[str.charAt(str.length - 1)];
  }
  return sum;
}


function decimalToRoman(sum) {
  const dict = {
    1 : 'I',
    5 : 'V',
    10 : 'X',
    50 : 'L',
    100 : 'C',
    500 : 'D',
    1000 : 'M',
  };
  var roman = "";
  while (sum !== 0) {
    const currentIndex = getIndex(sum);
    if (sum > 0) {
      roman += dict[Object.keys(dict)[currentIndex]];
      sum -= parseInt(Object.keys(dict)[currentIndex]);
    } else {
      roman = dict[Object.keys(dict)[currentIndex]] + roman;
      sum += parseInt(Object.keys(dict)[currentIndex]);
    }
  }
  return roman;
}


function getIndex(sum) {
  const dict = {
    1 : 'I',
    5 : 'V',
    10 : 'X',
    50 : 'L',
    100 : 'C',
    500 : 'D',
    1000 : 'M',
  };
  var minAbsolute = Math.abs(sum - 1);
  var currentIndex = 0;
  for (let i = 1; i < Object.keys(dict).length; ++i) {
    if (Math.abs(sum - Object.keys(dict)[i]) < minAbsolute) {
      currentIndex = i;
    }
  }
  return currentIndex;
}

module.exports = romanNumeralReduction;
