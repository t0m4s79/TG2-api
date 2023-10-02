const translations = require('../taskTranslations')

// Fisher-Yates shuffle algorithm https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function storiesTask(type, questions, lang) {
    const language = lang;
    const taskTranslations = translations.loadTaskTranslations(`storiesTask_${language}`, language);
    const shortStoriesData = require(`../translations/${language}/shortStories_${language}.json`)
    const mediumStoriesData = require(`../translations/${language}/mediumStories_${language}.json`);
    const longStoriesData = require(`../translations/${language}/longStories_${language}.json`);
    const imageStoriesData = require(`../translations/en/imageStories_en.json`);

  var size = type;
  if (size == 0) {
    if (questions > 4) questions = 4;
  }
  if (size == 1) {
    if (questions > 6) questions = 6;
  }
  if (size == 2) {
    if (questions > 10) questions = 10;
  }

  if (type == 3) {
    size = 1;
    if (questions > 9) questions = 9;
  }

  let index;
  let instructions;
  let img;

    let selectedStory;

    instructions = taskTranslations.instructions_text;

    //Select one story randomly
    if (type == 0) {
        index = Math.floor(Math.random() * shortStoriesData.length);
        selectedStory = shortStoriesData[index];
    }
    if(type == 1) {
        index = Math.floor(Math.random() * mediumStoriesData.length);
        selectedStory = mediumStoriesData[index];
    }
    if(type == 2) {
        index = Math.floor(Math.random() * longStoriesData.length);
        selectedStory = mediumStoriesData[index];
    }
    if (type == 3){
        instructions = taskTranslations.instructions_img;
        index = Math.floor(Math.random() * imageStoriesData.length);
        selectedStory = imageStoriesData[index];
        img = selectedStory.story;
    }

    //console.log(selectedStory)

    var text = selectedStory.story

    var sentences = [];
    var sentences_selected = [];

    for (var i = 0; i < selectedStory.statements.length; i++) {
        sentences_selected.push(selectedStory.statements[i]);
    }

    for (i = 0; i < questions; ) {
        if (sentences_selected.length > 0) {
            var pointer = Math.floor(Math.random() * sentences_selected.length);
            sentences.push(sentences_selected[pointer])
            sentences_selected.splice(pointer, 1);
            i++;
        }
    }

    shuffle(sentences)
  

  //console.log(text)

  return {instructions, text, sentences, img}
}

function storiesModel(questions, type) {
  var size = type;

  if (size == 0) {
    if (questions > 4) questions = 4;
  }
  if (size == 1) {
    if (questions > 6) questions = 6;
  }
  if (size == 2) {
    if (questions > 10) questions = 10;
  }

  if (type == 3) {
    size = 1;
    if (questions > 9) questions = 9;
  }

  if (type == 3) type = 0;
  else type = 1;

  // Ex. Funct.
  var exfunctions = (1.9 + size * 1.45).toFixed(1);

  // Attention
  var attention = (2.618 + type * 1.025 + questions * 0.454).toFixed(1);

  // Memory
  var memory = (1.95 + type * 1.05 + questions * 0.5).toFixed(1);

  // Language
  var language = (1.461 + type * 1.575 + questions * 0.382).toFixed(1);

  // Difficulty
  var difficulty = (1.298 + type * 0.937 + questions * 0.545).toFixed(1);

  return {attention, memory, exfunctions, language, difficulty};
}

function taskObject(type, questions, lang) {

    var taskJSON = {}

    var taskArray = storiesTask(type, questions, lang)

    var model = storiesModel(questions, type)

    console.log(taskArray)

    taskJSON['model'] = model;
    taskJSON['instructions'] = taskArray.instructions;
    taskJSON['image'] = taskArray.img;
    taskJSON['text'] = taskArray.text;
    taskJSON['sentences'] = taskArray.sentences;

    console.log('taskJSON', taskJSON)

    return taskJSON
}

module.exports = {
    storiesModel,
    storiesTask,
    taskObject
}