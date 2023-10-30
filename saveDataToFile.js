const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

async function saveDataToFile(data, taskType) {
    try {
        const taskTypeDirectory = path.join(__dirname, 'savedData', taskType);

        if (!fs.existsSync(taskTypeDirectory)) {
            fs.mkdirSync(taskTypeDirectory, { recursive: true });
        }

        const uniqueID = nanoid();
        const filePath = path.join(taskTypeDirectory, `${uniqueID}.json`);

        const jsonData = JSON.stringify(data, null, 2);
        
        await fs.promises.writeFile(filePath, jsonData); // Asynchronous write operation

        return { success: true, message: 'Data saved successfully' };
    } catch (error) {
        console.error(`Error saving data: ${error}`);
        return { success: false, message: 'Failed to save data' };
    }
}

module.exports = {
    saveDataToFile
}
