const { nanoid } = require("nanoid");
const translations = require('../taskTranslations')

function actionSequencingTask(type, size, lang) {
    const language = lang;
    const taskTranslations = translations.loadTaskTranslations(`actionSequencingTask_${language}`, language);

  if (size > 6) size = 6;

  var implicit = taskTranslations.implicit;
  var explicit = taskTranslations.explicit;

  var instructions = taskTranslations.instructions;

  var index;

  var sentences = [];
  var selected = [];
  var action;

  if (type == 0) {
    index = Math.floor(Math.random() * implicit.length);
    //Push object to selected 
    selected.push(implicit[index]);
    
    for (
        i = 0;
        i < size; 
  
      ) {
        if (Math.random() > 0.5) {
          if (selected[0].steps.length > 0) {
            var pointer = Math.floor(Math.random() * selected[0].steps.length);
            sentences.push(selected[0].steps[pointer]);
            selected[0].steps.splice(pointer, 1);
            i++;
          }
        }
    }

  } else {
    index = Math.floor(Math.random() * explicit.length);
    action = explicit[index].action;

    selected.push(explicit[index]);
    
    for (
        i = 0;
        i < size; 
      ) {
        if (Math.random() > 0.5) {
          if (selected[0].steps.length > 0) {
            var pointer = Math.floor(Math.random() * selected[0].steps.length);
            sentences.push(selected[0].steps[pointer]);
            selected[0].steps.splice(pointer, 1);
            i++;
          }
        }
    }
  }

  const sentencesObj = sentences.map((sentence, index) =>{
    return { id: nanoid(), sentence };
  })

  return{instructions, sentencesObj, action}
}

function actionSequencingModel(size, type) {
  // Ex. Funct.
  var exfunctions = (2.838 + size * 0.487).toFixed(1);

  // Attention
  var attention = (2.9 + size * 0.75 - type * 1.1).toFixed(1);

  // Memory
  var memory = (1.507 + size * 0.635).toFixed(1);

  // Language
  var language = (3.325 + size * 0.525 - type * 1.2).toFixed(1);

  // Difficulty
  var difficulty = (1.95 + size * 0.862 - type * 1.325).toFixed(1);

  return {attention, memory, exfunctions, language, difficulty};
}

function taskObject(type, size, lang){

  var taskJSON = {}

  var taskArray = actionSequencingTask(type, size, lang)

  var model = actionSequencingModel(size, type)

  taskJSON['model'] = model;
  taskJSON['instructions'] = taskArray.instructions;
  taskJSON['action'] = taskArray.action;
  taskJSON['sentences'] = taskArray.sentencesObj;
  //console.log('taskJSON :', taskJSON)
  
  return taskJSON
}

module.exports = {
  actionSequencingModel,
  actionSequencingTask,
  taskObject
}