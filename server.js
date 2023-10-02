const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const cancel = require('./tasks/cancellationTask');
const sequence = require('./tasks/sequencingTask');
const problem = require('./tasks/problemTask');
const association = require('./tasks/associationTask');
const context = require('./tasks/contextTask');
const categorization = require('./tasks/categorizationTask');
const actionSeq = require('./tasks/actionSequencingTask');
const imagePairs = require('./tasks/imagePairsTask');
const maze = require('./tasks/mazeTask')
const soup = require('./tasks/soupTask');
const memrecall = require('./tasks/storiesTask');
const profile = require('./tasks/profileTask')

const save = require('./saveDataToFile')

app.use(cors())
app.use(express.urlencoded({extended:true}));
// Solution to "Error 413 payload too large" found in  https://stackoverflow.com/questions/60947294/error-413-payload-too-large-when-upload-image
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(express.json());

app.post('/:language/profile', (req,res) => {
    console.log('POST profile')
    const  lang  = req.params.language;
    console.log(req.body)

    const profileTask = {
        name: req.body.userName,
        attention: req.body.attention,
        memory: req.body.memory,
        executivefunctions: req.body.execFunction,
        language: req.body.language,
        difficulty: req.body.difficulty,
        closeMatch: req.body.closeMatch
    }

    const task = profile.generateTraining(profileTask.name, profileTask.attention, profileTask.memory, profileTask.executivefunctions, profileTask.language, profileTask.difficulty, profileTask.closeMatch, lang)

    res.json(task)
})

app.post('/:language/cancellation', (req,res) =>{
    console.log('POST')
    const  lang  = req.params.language;
    //console.log(language)
    console.log(req.body)

    const cancelTask = ({
        elements: req.body.elements,
        probability: req.body.probability,
        size: req.body.size,
        numbers: req.body.numbers,
        order: req.body.order
    })

    const task = cancel.taskObject(cancelTask.elements,cancelTask.probability,cancelTask.size,cancelTask.numbers,cancelTask.order, lang)

    //res.send(task)
    res.json(task)
})

app.post('/:language/sequencing', (req,res)=>{
    console.log('POST')
    const  lang  = req.params.language;
    console.log(req.body)

    const sequenceTask = {
        elements: req.body.elements,
        step: req.body.step, 
        order: req.body.order, 
        where: req.body.where, 
        missing: req.body.missing
    }

   const task = sequence.taskObject(sequenceTask.elements,sequenceTask.step,sequenceTask.order,sequenceTask.where,sequenceTask.missing, lang)

    res.json(task)
})

app.post('/:language/problem', (req,res)=>{
    console.log('POST')
    const  lang  = req.params.language;
    console.log(req.body)

    const problemTask = {
        size: req.body.size,
        tens: req.body.tens,
        explicit: req.body.explicit
    }

   const task = problem.taskObject(problemTask.size, problemTask.tens, problemTask.explicit, lang)

    res.json(task)
})

app.post('/:language/association', (req,res)=>{
    console.log('POST')
    const  lang  = req.params.language;
    console.log(req.body)

    const associationTask = {
        size: req.body.size,
        imageType : req.body.imageType
    }

   const task = association.taskObject(associationTask.size, associationTask.imageType, lang)

    res.json(task)
})

app.post('/:language/context', (req,res)=>{
    console.log('POST')
    const  lang  = req.params.language;
    console.log(req.body)

    const contextTask = {
        size: req.body.size
    }

   const task = context.taskObject(contextTask.size, lang)

    res.json(task)
})

app.post('/:language/categorization', (req,res)=>{
    console.log('POST')
    const  lang  = req.params.language;
    console.log(req.body)

    const categorizationTask = {
        categories: req.body.categories,
        elements: req.body.elements
    }

   const task = categorization.taskObject(categorizationTask.categories, categorizationTask.elements, lang)

    res.json(task)
})

app.post('/:language/actionsequencing', (req,res)=>{
    console.log('POST')
    const  lang  = req.params.language;
    console.log(req.body)
    
    const actionSeqTask = {
        actionType: req.body.actionType,
        elements: req.body.elements
    }

   const task = actionSeq.taskObject(actionSeqTask.actionType, actionSeqTask.elements, lang)
    
    res.json(task)
})

app.post('/:language/imagePairs', (req,res)=>{
    console.log('POST')
    const  lang  = req.params.language;
    console.log(req.body)

    const imagePairsTask = {
        size: req.body.size,
        imageType: req.body.imageType
    }

   const task = imagePairs.taskObject(imagePairsTask.size, imagePairsTask.imageType, lang)

    res.json(task)
})

app.post('/:language/maze', (req,res) => {
    console.log('POST maze')
    const  lang  = req.params.language;
    console.log(req.body)

    const mazeTask = {
        elements: req.body.mazeElements,
    }

    const task = maze.taskObject(mazeTask.elements, lang)

    res.json(task)
})

app.post('/:language/wordSoup', (req,res) => {
    console.log('POST')
    const  lang  = req.params.language;
    console.log(req.body)

    const soupTask = {
        elements: req.body.elements,
        cues: req.body.cues
    }

   const task = soup.taskObject(soupTask.elements, soupTask.cues, lang)

    res.json(task)
})

app.post('/:language/memoryRecall', (req,res) => {
    console.log('POST')
    const  lang  = req.params.language;
    console.log(req.body)

    const storyTask = {
        questions: req.body.storyQuestions,
        type: req.body.storyType
    }

   const task = memrecall.taskObject(storyTask.type, storyTask.questions, lang)

    res.json(task)
})

app.post('/store-data', (req,res) => {

    try{
        const jsonData = req.body;
        const taskType = jsonData.task;
        console.log(jsonData)
        save.saveDataToFile(jsonData, taskType)
        res.status(200).json({ message: 'Data stored successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
/*
app.get('/cancellationTask', (req,res)=>{
    res.send(task)
})

app.get('/sequencingTask', (req,res)=>{
    res.send(task)
})

app.get('/maze', (req,res)=>{
    res.render(maze)
})*/

app.listen(process.env.PORT || 3001, ()=>{
    console.log('Server listening')
})
