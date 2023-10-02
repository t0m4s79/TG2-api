const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

function saveDataToFile(data, taskType) {
    // Define the target directory for the task type
    const taskTypeDirectory = path.join(__dirname, 'savedData', taskType);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(taskTypeDirectory)) {
        fs.mkdirSync(taskTypeDirectory, { recursive: true });
    }

    // Generate a unique ID for the data submission
    const uniqueID = nanoid();

    // Define the file path with the unique ID as the file name
    const filePath = path.join(taskTypeDirectory, `${uniqueID}.json`);

    // Convert data to JSON and save it to the file
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);
}

module.exports = {
    saveDataToFile
}
