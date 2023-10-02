const cancel = require('./cancellationTask');
const sequence = require('./sequencingTask');
const problem = require('./problemTask');
const association = require('./associationTask');
const context = require('./contextTask');
const categorization = require('./categorizationTask');
const actionSeq = require('./actionSequencingTask');
const imagePairs = require('./imagePairsTask');
const soup = require('./soupTask');
const memrecall = require('./storiesTask');
const maze = require('./mazeTask');

function generateTraining(
  name,
  attention,
  memory,
  executivefunctions,
  language,
  difficulty,
  closeMatch, lang
) {

  console.log(attention,
    memory,
    executivefunctions,
    language,
    difficulty,)

    // Object to store task data
    let taskData = {};

  let clipart = Math.floor(Math.random() * 2);


  let model;
  let thresholdError = 10;
  let compute;

  let elements = [];

  //Search for optimal image pairs task parameters
  let sum = 0;
  let error = 100000000;

  elements = ["8"];
  for (let i_elements = 1; i_elements < elements; i_elements++) {
    model = imagePairs.imagePairsModel(i_elements);
    sum =
      Math.pow(parseFloat(model['attention']) - attention, 2) +
      Math.pow(parseFloat(model['memory']) - memory, 2) +
      Math.pow(parseFloat(model['exfunctions']) - executivefunctions, 2) +
      Math.pow(parseFloat(model['language']) - language, 2) +
      Math.pow(parseFloat(model['difficulty']) - difficulty, 2);
    if (error > sum) {
      closest = [i_elements];
      error = sum;
    }
  }
  compute = true;
  if (closeMatch) if (error > thresholdError) compute = false;

  if (compute) {
    if (clipart) taskData['imagePairs'] = imagePairs.taskObject(parseFloat(closest[0]), 1, lang);
    else taskData['imagePairs'] = imagePairs.taskObject(parseFloat(closest[0]), 0, lang);
  }

  //Search for optimal cancellationTask parameters

  for (i = 3; i < 40; i++) elements.push(i * i);

  let probability = [];
  for (i = 5; i < 90; i = i + 5) probability.push(i);

  let numbers = ["0", "1", "2"];
  let order = ["0", "1"];

  let size = 15;
  sum = 0;
  error = 100000000;

  for (let i_elements = 0; i_elements < elements.length; i_elements++) {
    for (let i_probability = 0; i_probability < probability.length; i_probability++) {
      for (let i_order = 0; i_order < order.length; i_order++) {
        for (let i_numbers = 0; i_numbers < numbers.length; i_numbers++) {
          model = cancel.cancellationModel(
            elements[i_elements],
            probability[i_probability],
            size,
            numbers[i_numbers],
            order[i_order]
          );
          sum =
            Math.pow(parseFloat(model['attention']) - attention, 2) +
            Math.pow(parseFloat(model['memory']) - memory, 2) +
            Math.pow(parseFloat(model['exfunctions']) - executivefunctions, 2) +
            Math.pow(parseFloat(model['language']) - language, 2) +
            Math.pow(parseFloat(model['difficulty']) - difficulty, 2);         
          if (error > sum) {
            closest = [
              elements[i_elements],
              probability[i_probability],
              size,
              numbers[i_numbers],
              order[i_order],
            ];
            error = sum;
          }
        }
      }
    }
  }
  size = 25 - 0.03 * parseFloat(closest[0]);
  compute = true;
  if (closeMatch) if (error > thresholdError) compute = false;

  if (compute) {
    taskData['cancellation'] = cancel.taskObject(
      parseFloat(closest[0]),
      parseFloat(closest[1]),
      size,
      parseFloat(closest[3]),
      parseFloat(closest[4]), 
      lang
    );
  }

  //Search for optimal sequencingTask parameters
  elements = ["12"];

  let step = [];
  for (i = 1; i < 9; i++) step.push(i);

  let missing = ["1", "2", "3", "4", "5"];
  order = ["2", "1", "0"];
  let where = ["1", "0"];

  sum = 0;
  error = 100000000;

  for (let i_elements = 0; i_elements < elements.length; i_elements++)
    for (let i_step = 0; i_step < step.length; i_step++)
      for (let i_where = 0; i_where < where.length; i_where++)
        for (let i_order = 0; i_order < order.length; i_order++)
          for (let i_missing = 0; i_missing < missing.length; i_missing++) {
            model = sequence.sequencingModel(
              elements[i_elements],
              step[i_step],
              order[i_order],
              where[i_where],
              missing[i_missing]
            );
            sum =
              Math.pow(parseFloat(model['attention']) - attention, 2) +
              Math.pow(parseFloat(model['memory']) - memory, 2) +
              Math.pow(parseFloat(model['exfunctions']) - executivefunctions, 2) +
              Math.pow(parseFloat(model['language']) - language, 2) +
              Math.pow(parseFloat(model['difficulty']) - difficulty, 2);
            if (error > sum) {
              closest = [
                elements[i_elements],
                step[i_step],
                order[i_order],
                where[i_where],
                missing[i_missing],
              ];
              error = sum;
            }
          }

  compute = true;
  if (closeMatch) if (error > thresholdError) compute = false;

  if (compute)
    taskData['sequencing'] = sequence.taskObject(
      parseFloat(closest[0]),
      parseFloat(closest[1]),
      parseFloat(closest[2]),
      parseFloat(closest[3]),
      parseFloat(closest[4]), 
      lang
    );

  //Search for optimal problem resolution parameters
  elements = ["10"];

  let tens = ["0", "1"];
  let explicit = ["0", "1"];

  sum = 0;
  error = 100000000;

  for (let i_elements = 2; i_elements < elements; i_elements++)
    for (let i_tens = 0; i_tens < tens.length; i_tens++)
      for (let i_explicit = 0; i_explicit < explicit.length; i_explicit++) {
        model = problem.problemModel(i_elements, tens[i_tens], explicit[i_explicit]);
        sum =
          Math.pow(parseFloat(model['attention']) - attention, 2) +
          Math.pow(parseFloat(model['memory']) - memory, 2) +
          Math.pow(parseFloat(model['exfunctions']) - executivefunctions, 2) +
          Math.pow(parseFloat(model['language']) - language, 2) +
          Math.pow(parseFloat(model['difficulty']) - difficulty, 2);
        if (error > sum) {
          closest = [i_elements, tens[i_tens], explicit[i_explicit]];
          error = sum;
        }
      }

  compute = true;
  if (closeMatch) if (error > thresholdError) compute = false;

  if (compute)
    taskData['problem'] = problem.taskObject(
      parseFloat(closest[0]),
      parseFloat(closest[1]),
      parseFloat(closest[2]),
      lang
    );

  //Search for optimal associationTask parameters
  sum = 0;
  error = 100000000;

  elements = ["20"];
  for (let i_elements = 2; i_elements < elements; i_elements++) {
    model = association.associationModel(i_elements);
    sum =
      Math.pow(parseFloat(model['attention']) - attention, 2) +
      Math.pow(parseFloat(model['memory']) - memory, 2) +
      Math.pow(parseFloat(model['exfunctions']) - executivefunctions, 2) +
      Math.pow(parseFloat(model['language']) - language, 2) +
      Math.pow(parseFloat(model['difficulty']) - difficulty, 2);
    if (error > sum) {
      closest = [i_elements];
      error = sum;
    }
  }

  compute = true;
  if (closeMatch) if (error > thresholdError) compute = false;

  if (compute)
    if (clipart) taskData['association'] = association.taskObject(parseFloat(closest[0]), 0, lang);
    else taskData['association'] = association.taskObject(parseFloat(closest[0]), 1, lang);

  //Search for optimal associationTask parameters
  sum = 0;
  error = 100000000;

  elements = ["10"];
  for (let i_elements = 3; i_elements < elements; i_elements++) {
    model = context.contextModel(i_elements);
    sum =
      Math.pow(parseFloat(model['attention']) - attention, 2) +
      Math.pow(parseFloat(model['memory']) - memory, 2) +
      Math.pow(parseFloat(model['exfunctions']) - executivefunctions, 2) +
      Math.pow(parseFloat(model['language']) - language, 2) +
      Math.pow(parseFloat(model['difficulty']) - difficulty, 2);
    if (error > sum) {
      closest = [i_elements];
      error = sum;
    }
  }

  compute = true;
  if (closeMatch) if (error > thresholdError) compute = false;

  if (compute) taskData['context'] = context.taskObject(parseFloat(closest[0]), lang);

  //Search for optimal word search task parameters
  elements = ["20"];
  let cues = ["0", "1"];

  sum = 0;
  error = 100000000;

  for (let i_elements = 1; i_elements < elements; i_elements++)
    for (let i_cues = 0; i_cues < cues.length; i_cues++) {
      model = soup.soupModel(i_elements, cues[i_cues]);
      sum =
        Math.pow(parseFloat(model['attention']) - attention, 2) +
        Math.pow(parseFloat(model['memory']) - memory, 2) +
        Math.pow(parseFloat(model['exfunctions']) - executivefunctions, 2) +
        Math.pow(parseFloat(model['language']) - language, 2) +
        Math.pow(parseFloat(model['difficulty']) - difficulty, 2);
      if (error > sum) {
        closest = [i_elements, cues[i_cues]];
        error = sum;
      }
    }

  compute = true;
  if (closeMatch) if (error > thresholdError) compute = false;

  if (compute) taskData['soup'] = soup.taskObject(parseFloat(closest[0]), parseFloat(closest[1]), lang);

  //Search for optimal mazeTask parameters
  sum = 0;
  error = 100000000;

  elements = ["11"];
  for (let i_elements = 3; i_elements < elements; i_elements++) {
    model = maze.mazeModel(i_elements);
    sum =
      Math.pow(parseFloat(model['attention']) - attention, 2) +
      Math.pow(parseFloat(model['memory']) - memory, 2) +
      Math.pow(parseFloat(model['exfunctions']) - executivefunctions, 2) +
      Math.pow(parseFloat(model['language']) - language, 2) +
      Math.pow(parseFloat(model['difficulty']) - difficulty, 2);
    if (error > sum) {
      closest = [i_elements];
      error = sum;
    }
  }

  compute = true;
  if (closeMatch) if (error > thresholdError) compute = false;

  if (compute) taskData['maze'] = maze.taskObject(parseFloat(closest[0]), lang);

  //Search for optimal categorization task parameters
  elements = ["10"];
  let categories = ["10"];

  sum = 0;
  error = 100000000;

  for (let i_elements = 2; i_elements < elements; i_elements++)
    for (let i_cues = 2; i_cues < categories; i_cues++) {
      model = categorization.categorizationModel(i_elements, i_cues);
      sum =
        Math.pow(parseFloat(model['attention']) - attention, 2) +
        Math.pow(parseFloat(model['memory']) - memory, 2) +
        Math.pow(parseFloat(model['exfunctions']) - executivefunctions, 2) +
        Math.pow(parseFloat(model['language']) - language, 2) +
        Math.pow(parseFloat(model['difficulty']) - difficulty, 2);

      if (error > sum) {
        closest = [i_elements, i_cues];
        error = sum;
      }
    }

  compute = true;
  if (closeMatch) if (error > thresholdError) compute = false;

  if (compute)
    taskData['categorization'] = categorization.taskObject(parseFloat(closest[0]), parseFloat(closest[1]), lang);

  //Search for optimal memory task parameters
  elements = ["11"];
  categories = ["4"];

  sum = 0;
  error = 100000000;

  for (let i_elements = 1; i_elements < elements; i_elements++)
    for (let i_cues = 0; i_cues < categories; i_cues++) {
      model = memrecall.storiesModel(i_elements, i_cues);
      sum =
        Math.pow(parseFloat(model['attention']) - attention, 2) +
        Math.pow(parseFloat(model['memory']) - memory, 2) +
        Math.pow(parseFloat(model['exfunctions']) - executivefunctions, 2) +
        Math.pow(parseFloat(model['language']) - language, 2) +
        Math.pow(parseFloat(model['difficulty']) - difficulty, 2);

      if (error > sum) {
        closest = [i_elements, i_cues];
        error = sum;
      }
    }

  compute = true;
  if (closeMatch) if (error > thresholdError) compute = false;

  if (compute) taskData['memrecall'] = memrecall.taskObject(parseFloat(closest[1]), parseFloat(closest[0]), lang);

  //Search for action sequencing task parameters
  elements = ["7"];
  categories = ["2"];

  sum = 0;
  error = 100000000;

  for (let i_elements = 2; i_elements < elements; i_elements++)
    for (let i_cues = 0; i_cues < categories; i_cues++) {
      model = actionSeq.actionSequencingModel(i_elements, i_cues);
      sum =
        Math.pow(parseFloat(model['attention']) - attention, 2) +
        Math.pow(parseFloat(model['memory']) - memory, 2) +
        Math.pow(parseFloat(model['exfunctions']) - executivefunctions, 2) +
        Math.pow(parseFloat(model['language']) - language, 2) +
        Math.pow(parseFloat(model['difficulty']) - difficulty, 2);

      if (error > sum) {
        closest = [i_elements, i_cues];
        error = sum;
      }
    }

  compute = true;
  if (closeMatch) if (error > thresholdError) compute = false;

  if (compute)
    taskData['actionSeq'] = actionSeq.taskObject(parseFloat(closest[1]), parseFloat(closest[0]), lang);

    return taskData
}

module.exports={
    generateTraining
}