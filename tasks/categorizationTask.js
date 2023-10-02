const Category_Pictures = require('../Category_Pictures')
const translations = require('../taskTranslations')

//Fisher–Yates shuffle algorithm from https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var m = array.length, t, i;
    
    // While there remain elements to shuffle…
    while (m) {
    
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
    
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    
    return array;
}

function categorizationModel(categories, elements) {
  // Ex. Funct.
  var exfunctions = (1.136 + categories * 0.989).toFixed(1);

  // Attention
  var attention = (
    -3.26 +
    categories * 3.75 +
    categories * elements * -0.41
  ).toFixed(1);

  // Memory
  var memory = (0.6 + categories * 0.9).toFixed(1);

  // Language
  var language = (1.914 + categories * 0.586).toFixed(1);

  // Difficulty
  var difficulty = (0.234 + categories * 1.165).toFixed(1);

  return {attention, memory, exfunctions, language, difficulty};
}

function categorizationTask(categories, elements, lang) {
    const language = lang;
    const taskTranslations = translations.loadTaskTranslations(`categorizationTask_${language}`, language);

  size = categories * elements;

  var list = [];
  for (i = 0; i < Category_Pictures.category_size(); i++) {
    list.push(i);
  }

  var allCategories = [];

  allCategories = list.map((item, index) => {
    return Category_Pictures.category_images(list[index], language);
  })

  const allCategoriesList = [...new Set(allCategories.flat().map(elem => elem.category))]
  //console.log('allCategoriesList', allCategoriesList)

  var pairs = [];
  var distractors = [];

  for (j = 0; j < categories; j++) {
    var tmp = [];

    while (tmp.length < elements) {
      index = Math.floor(Math.random() * list.length);
      tmp = Category_Pictures.category_images(list[index], language); //IPNP_images();
      //console.log(tmp)
      list.splice(index, 1);
    }

    while (tmp.length > elements) {
      tmp.splice(Math.floor(Math.random() * tmp.length), 1);
    }

    for (i = 0; i < tmp.length; i++) {
      pairs.push(tmp[i]);
    }
  }

  distractors = list.map((elem, index) => {
    return Category_Pictures.category_images(index, language)
  })
  
  const distractorsList = [...new Set(distractors.flat().map(elem => elem.category))];
  
  //console.log('distractorsList:', distractorsList)
  
  const targetCategories = [...new Set(pairs.flat().map(elem => elem.category))]

  console.log('targetCategories:', targetCategories)

  var instructions = taskTranslations.instructions;

  var note = taskTranslations.note;

  shuffle(pairs)

  return {instructions, pairs, note, allCategoriesList, categories, elements}
}

function taskObject(categories, elements, lang){

  var taskJSON = {}

  var model = categorizationModel(categories, elements);

  var task = categorizationTask(categories, elements, lang);

  taskJSON['model'] = model;
  taskJSON['instructions'] = task.instructions;
  taskJSON['taskArray'] = task.pairs;
  taskJSON['note'] = task.note;
  taskJSON['allCategoriesList'] = task.allCategoriesList;
  taskJSON['categories'] = task.categories;
  taskJSON['elements'] = task.elements;

  //console.log('taskJson: ', taskJSON)
  /*console.log('taskJSON :' + JSON.stringify(taskJSON, function(k,v) {
    if(v instanceof Array)
      return JSON.stringify(v);
    return v;
    }, 2).replace(/\\/g, '')
          .replace(/\"\[/g, '[')
          .replace(/\]\"/g,']')
          .replace(/\"\{/g, '{')
          .replace(/\}\"/g,'}'));
    // pretty print*/
  return taskJSON

}

module.exports = {
  taskObject,
  categorizationModel,
  categorizationTask
}