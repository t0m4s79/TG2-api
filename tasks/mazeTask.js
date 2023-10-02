const mazeUtils = require('../mazeUtil')
const translations = require('../taskTranslations')

function mazeModel(elements_param) {
  elements = elements_param / 2;

  // Ex. Funct.
  //var exfunctions = (3.459 + Distractors*0.014 + T_lettersyes*(-0.814) + T_numbersyes*(-0.845) + Targets*0.012 + Desorganizationyes*0.724).toFixed(1);
  var exfunctions = (2.39 + elements * 1.375).toFixed(1);

  // Attention
  var attention = (2.876 + elements * 1.2).toFixed(1);

  // Memory
  var memory = (1.867 + elements * 1).toFixed(1);

  // Language
  var language = (2.233 + elements * 0.525).toFixed(1);

  // Difficulty
  var difficulty = (1.733 + elements * 1.45).toFixed(1);

  return {attention, memory, exfunctions, language, difficulty};
}

function mazeTask(elements, lang) {
    console.log(lang)
    const language = lang;
    const taskTranslations = translations.loadTaskTranslations(`mazeTask_${language}`, language);

  elements = Math.round(elements * 1.3);

  // Task specific variables

  var instructions = taskTranslations.instructions;

    console.log('elements', elements)
  var maze = mazeUtils.generateMaze( (2 * elements - 2), (elements * 2) )

  return {instructions, maze}
}

function taskObject(elements, lang) {
    
    var taskJSON = {}
    const task = mazeTask(elements, lang)
    const model = mazeModel(elements)

    taskJSON['model'] = model
    taskJSON['instructions'] = task.instructions
    taskJSON['maze'] = task.maze
    console.log('taskJSON: ', taskJSON)

    return taskJSON
}

module.exports = {
    mazeModel,
    mazeTask,
    taskObject
}