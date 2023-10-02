const IPNP = require('../IPNP_Object_Pictures')
const pictures = require('../Object_Pictures')
const translations = require('../taskTranslations')
var { nanoid } = require('nanoid')

function imagePairsModel(size) {
  // Ex. Funct.
  var exfunctions = (3.491 + size * 0.412).toFixed(1);

  // Attention
  var attention = (3.811 + size * 0.587).toFixed(1);

  // Memory
  var memory = (3.792 + size * 0.637).toFixed(1);

  // Language
  var language = (2.716 + size * 0.388).toFixed(1);

  // Difficulty
  var difficulty = (2.54 + size * 0.762).toFixed(1);

  return {attention, memory, exfunctions, language, difficulty};
}

function imagePairsTask(size, imageType, lang) {
    const language = lang;
    const taskTranslations = translations.loadTaskTranslations(`imagePairsTask_${language}`, language);
  
  var pairs = []
  if(imageType == 1){
    pairs = pictures();
  }
  if(imageType == 0){
    var pairs = IPNP();
    var note = taskTranslations.note;
  }
  var instructions = taskTranslations.instructions;

    var left = [];
    var right = [];

  for (i = 0; i < size; i++) {
  
    index = Math.floor(Math.random() * pairs.length);
    left.push(pairs[index]);
    pairs.splice(index, 1);
    
    index = Math.floor(Math.random() * pairs.length);
    right.push(pairs[index]);
    pairs.splice(index, 1);
  }

  const leftObjects = left.map((image, index) =>{
    return { id: nanoid(), image };
  })

  const rightObjects = right.map((image, index) => {
  return { id: leftObjects[index].id, image };
  })
  var pairings = []

  for(let i=0 ; i < left.length ; i++){
      pairings.push({left: leftObjects[i], right: rightObjects[i]})
  }

  return {instructions, leftObjects, rightObjects, pairings, note}
}

function taskObject(size, imageType, lang){

  var taskJSON = {}
  var taskArray = imagePairsTask(size, imageType, lang)

  var model = imagePairsModel(size)

  taskJSON['model'] = model;
  taskJSON['instructions'] = taskArray.instructions;
  taskJSON['leftObjects'] = taskArray.leftObjects;
  taskJSON['rightObjects'] = taskArray.rightObjects;
  taskJSON['pairings'] =  taskArray.pairings;
  taskJSON['note'] = taskArray.note;

  //console.log('TaskJSON', taskJSON)

  return taskJSON
}

module.exports = {
  imagePairsModel,
  imagePairsTask,
  taskObject
}