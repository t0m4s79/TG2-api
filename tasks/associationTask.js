const translations = require('../taskTranslations')
const IPNP = require('../IPNP_Object_Pictures')
const pictures = require('../Object_Pictures')
var { nanoid } = require('nanoid')

function associationModel(size) {
    // Ex. Funct.
    var exfunctions = (2.729 + size * 0.238).toFixed(1);
  
    // Attention
    var attention = (1.512 + size * 0.487).toFixed(1);
  
    // Memory
    var memory = (1.378 + size * 0.4).toFixed(1);
  
    // Language
    var language = (3.28).toFixed(1);
  
    // Difficulty
    var difficulty = (1.435 + size * 0.45).toFixed(1);
  
    return {attention, memory, exfunctions, language, difficulty};
}
  
function associationTask(size, imageType, lang) {
    const language = lang;
    const taskTranslations = translations.loadTaskTranslations(`associationTask_${language}`, language);
  
    var pairs = []
    if(imageType == 1){
      pairs = pictures();
    }
    if(imageType == 0){
      var pairs = IPNP();
      var note = taskTranslations.note
    }


    var instructions = taskTranslations.instructions;
  
    var dimension;
    var left = [];
    var right = [];
    var index;
  
    var step;
    if (size > 5) step = 5;
    else step = size;
  
    for (i = 0; i < size * 2; i = i + 2) {
      index = Math.floor((Math.random() * pairs.length) / 2);

      left.push(pairs[index * 2]);
      right.push(pairs[index * 2 + 1]);
      pairs.splice(index * 2, 2);
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

    leftObjects.sort(()=> Math.random() - 0.5)
    rightObjects.sort(()=> Math.random() - 0.5)

  return {instructions, leftObjects, rightObjects, pairings, note}
}

function taskObject(size, imageType, lang){

  var taskJSON = {}
  var taskArray = associationTask(size, imageType, lang)

  var model = associationModel(size)

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
  associationModel,
  associationTask,
  taskObject
}