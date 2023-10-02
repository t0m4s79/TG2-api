
const fs = require('fs');
const path = require('path');

function loadTaskTranslations(taskName, language) {
    const translationsFolderPath = path.join(__dirname, './translations', language);
    const translationFilePath = path.join(translationsFolderPath, `${taskName}.json`);

    try {
        const rawData = fs.readFileSync(translationFilePath, 'utf-8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error(`Error loading translations for ${taskName} in ${language}: ${error.message}`);
        return {};
    }
}

module.exports = {
    loadTaskTranslations
}