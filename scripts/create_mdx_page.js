// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');

const args = process.argv.slice(2);

const folderName = args[0];
const languageFolder = args[1] ?? 'pt-BR';

const path = `${__dirname}/../src/app/skill-docs`;

try {
    fs.mkdirSync(`${path}/${folderName}`);
    console.log('directory folder created successfully!');
} catch (error) {
    console.log(error);
}

try {
    fs.mkdirSync(`${path}/${folderName}/${languageFolder}`);
    console.log('language folder created successfully!');
} catch (error) {
    console.log(error);
}

fs.writeFile(
    `${path}/${folderName}/${languageFolder}/page.mdx`,
    `import { Footer } from '@/components';\r\r${folderName}\r===========\r____________\r\r<Footer/>`,
    (err) => {
        if (err) throw err;

        console.log('File created and content written successfully (asynchronous).');
    },
);
