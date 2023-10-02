const translations = require('../taskTranslations')

function sequencingModel(size, step, order, where, missing) {
  switch (order) {
    case "0":
      var AscendentYes = 1;
      break;
    case "1":
      var AscendentYes = 0;
      break;
    default:
      var AscendentYes = 0.5;
      break;
  }

  var position = 0;

  if (where == 1) position = (size - missing) / 2;

  // Ex. Funct.
  var exfunctions = (6.682 + missing * -0.014 + position * -0.002).toFixed(1);

  // Attention
  var attention = (6.923 + missing * -0.02 + position * -0.003).toFixed(1);

  // Memory
  var memory = (5.364 + missing * -0.027 + position * -0.003).toFixed(1);

  // Language
  var language = (4.722 + missing * -0.02 + position * -0.003).toFixed(1);

  // Difficulty
  var difficulty = (1.29 + step * 1.232 + AscendentYes * -0.841).toFixed(1);

  return {attention, memory, exfunctions, language, difficulty};
}

function sequencingTask(size, step, order, where, missing) {
    const language = 'pt';
    const taskTranslations = translations.loadTaskTranslations(`sequencingTask_${language}`, language);

  var instructions = taskTranslations.instructions;

  if (order == 1) step = -step;

  // Sequence print here
  var sequenceArray = []

  for (j = 0; j < 9; j++) {
    if (order == 2) if (Math.random() > 0.5) step = -step;

    var sequence = [];
    var first = Math.floor(Math.random() * 10);
    if (step < 0) first += size * Math.abs(step);

    for (i = 0; i < size; i++) sequence.push((first + step * i).toString());

    var position = 0;

    if (where == 1) position = Math.floor(Math.random() * (size - missing + 1));

    for (i = 0; i < missing; i++) sequence[position + i] = "__";
    sequenceArray.push(sequence)
    //console.log(sequenceArray)
  }

  return {instructions, sequenceArray}
}

function taskObject(size, step, order, where, missing){

  taskJSON = {}

  taskArray = sequencingTask(size, step, order, where, missing)

  model = sequencingModel(size, step, order, where, missing)

  taskJSON['model'] = model;
  taskJSON['instructions'] = taskArray.instructions;
  taskJSON['sequence'] = taskArray.sequenceArray;

  //console.log('taskJSON: ', taskJSON)
  return taskJSON
}

module.exports ={
  sequencingModel,
  sequencingTask,
  taskObject
}