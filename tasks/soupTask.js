const translations = require('../taskTranslations')

function soupModel(elements, clues) {
  // Ex. Funct.
  var exfunctions = (5.138 - clues * 0.913 + elements * 0.171).toFixed(1);

  // Attention
  var attention = (6.15 - clues * 0.7 + elements * 0.144).toFixed(1);

  // Memory
  var memory = (4 - clues * 1 + elements * 0.269).toFixed(1);

  // Language
  var language = (5.65).toFixed(1);

  // Difficulty
  var difficulty = (5.466 - clues * 1.154 + elements * 0.176).toFixed(1);

  return {attention, memory, exfunctions, language, difficulty};
}

function soupTask(n_words, cues, lang) {

    const language = lang;
    const taskTranslations = translations.loadTaskTranslations(`soupTask_${language}`, language);
    console.log(taskTranslations)

  var elements = n_words * n_words;
  if (elements < 100) elements = 100;

  // Task specific variables
  var distractor = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  target = taskTranslations.target;

  var n_elements = Math.floor(Math.sqrt(elements));
  var list = [];
  var matrix = [];
  var matrix_words = [];
  var wordsWithPositions = [];

  // Create randomly filled soup
  for (x = 0; x < n_elements * n_elements; x++) {
    matrix.push(distractor[Math.floor(Math.random() * distractor.length)]);
    matrix_words.push("0");
  }

  // Insert words into soup
  for (count = 0; count < n_words; count++) {
    var fits = false;
    var index, position_x, position_y, orientation;
    let wordPositions = []; // Store the positions of the letters in the word


    while (fits == false) {
      index = Math.floor(Math.random() * target.length);
      word = target[index];
      position_x = Math.floor(Math.random() * n_elements);
      position_y = Math.floor(Math.random() * n_elements);
      orientation = Math.floor(Math.random() * 3);

      fits = check(
        position_x,
        position_y,
        word,
        matrix_words,
        n_elements,
        orientation
      );
    }
    write(
      position_x,
      position_y,
      word,
      matrix,
      matrix_words,
      n_elements,
      orientation,
      wordPositions
    );
    list.push(word);
    wordsWithPositions.push({ word, positions: wordPositions }); // Store word and its positions
    target.splice(index, 1);
  }

  // Print instructions
  var instructions;
  if (cues == "0")
    instructions =  taskTranslations.instructions_no_clues_pt1 + n_words + taskTranslations.instructions_no_clues_pt2 ;
  else {
    instructions = taskTranslations.instructions_w_clues_pt1;

    for (i = 0; i < list.length; i++) {
      instructions += list[i];
      if (i != list.length - 1) instructions += ", ";
    }

    instructions += taskTranslations.instructions_w_clues_pt2;
  }

  // Create the two-dimensional grids
  var grid = [];
  var grid_words = []
  for (var i = 0; i < n_elements; i++) {
    var row = [];
    var row_words = [];
    for (var j = 0; j < n_elements; j++) {
      var index = i * n_elements + j;
      row.push(matrix[index]);
      row_words.push(matrix_words[index]);
    }
    grid.push(row);
    grid_words.push(row_words);
  }

  return {elements, instructions, list, grid, grid_words, wordsWithPositions}
}

function check(position_x, position_y, word, matrix, n_elements, orientation) {
  switch (orientation) {
    case 0:
      if (word.length < n_elements - position_x) {
        for (x = position_x; x < position_x + word.length; x++) {
          y = position_y; //for (y=0;y<n_elements;y++)
          {
            if (matrix[n_elements * y + x] != "0") return false;
          }
        }
      } else return false;
      break;

    case 1:
      if (word.length < n_elements - position_y) {
        if (word.length < n_elements - position_x) {
          y = position_y;
          for (x = position_x; x < position_x + word.length; x++) {
            if (matrix[n_elements * y + x] != "0") return false;
            y++;
          }
        } else return false;
      } else return false;
      break;

    case 2:
      if (word.length < n_elements - position_y) {
        for (y = position_y; y < position_y + word.length; y++) {
          x = position_x; //for (y=0;y<n_elements;y++)
          {
            if (matrix[n_elements * y + x] != "0") return false;
          }
        }
      } else return false;
      break;

    default:
      return true;
      break;
  }
  return true;
}

function write(
  position_x,
  position_y,
  word,
  matrix,
  matrix_words,
  n_elements,
  orientation,
  wordPositions
) {

  switch (orientation) {
    case 0:                                                                 //Write word horizontally
      if (word.length < n_elements - position_x) {
        for (x = position_x; x < position_x + word.length; x++) {
          y = position_y; //for (y=0;y<n_elements;y++)
          {
            matrix[n_elements * y + x] = word.charAt(x - position_x);
            matrix_words[n_elements * y + x] = word.charAt(x - position_x);
            wordPositions.push({ x, y }); // Store the positions
          }
        }
      }

      break;
      
    case 1:                                                                 //Write word diagonally
      if (word.length < n_elements - position_y) {
        if (word.length < n_elements - position_x) {
          y = position_y;
          for (x = position_x; x < position_x + word.length; x++) {
            matrix[n_elements * y + x] = word.charAt(x - position_x);
            matrix_words[n_elements * y + x] = word.charAt(x - position_x);
            wordPositions.push({ x, y }); // Store the positions
            y++;
          }
        }
      }
      break;

    case 2:                                                                 //Write word vertically
      if (word.length < n_elements - position_y) {
        for (y = position_y; y < position_y + word.length; y++) {
          x = position_x; //for (y=0;y<n_elements;y++)
          {
            matrix[n_elements * y + x] = word.charAt(y - position_y);
            matrix_words[n_elements * y + x] = word.charAt(y - position_y);
            wordPositions.push({ x, y }); // Store the positions
          }
        }
      }

      break;

    default:
      break;
  }
  const wordPosObj = { word, positions: wordPositions }
  console.log(wordPosObj)
  return [ wordPosObj ]
}

function taskObject(n_words, cues, lang){

    taskJSON = {};

    taskArray = soupTask(n_words, cues, lang);

    model = soupModel(n_words, cues);

    taskJSON['model'] = model;
    taskJSON['instructions'] = taskArray.instructions;
    taskJSON['n_elements'] = taskArray.elements;
    taskJSON['words'] = taskArray.list;
    taskJSON['matrix'] = taskArray.grid;
    taskJSON['matrix_words'] = taskArray.grid_words;
    taskJSON['wordsWithPositions'] = taskArray.wordsWithPositions;

    //console.log('TaskJSON', taskJSON);

    return taskJSON;
}

module.exports = {
    soupModel,
    soupTask,
    taskObject
}