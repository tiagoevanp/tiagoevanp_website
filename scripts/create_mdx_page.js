// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');

const args = process.argv.slice(2);

const folderName = args[0];

// Every doc exists in both languages
const languages = ['en', 'pt-BR'];

if (!folderName) {
    console.log('usage: node scripts/create_mdx_page.js <topic>');
    process.exit(1);
}

for (const languageFolder of languages) {
    const path = `${__dirname}/../src/app/(${languageFolder})/skill-docs/${folderName}/${languageFolder}`;

    try {
        fs.mkdirSync(path, { recursive: true });
        console.log(`${languageFolder} folder created successfully!`);
    } catch (error) {
        console.log(error);
    }

    // The Footer links come from the sidebar order, so add the doc to GroupsList too
    fs.writeFile(
        `${path}/page.mdx`,
        [
            'import { Footer } from \'@/components\';',
            'import { skillDocMetadata } from \'@/lib/seo\';',
            '',
            'export const metadata = skillDocMetadata(',
            `    '${folderName}',`,
            `    '${languageFolder}',`,
            `    '${folderName}', // TODO: title`,
            '    \'TODO: description\',',
            ');',
            '',
            folderName,
            '===========',
            '____________',
            '',
            '<Footer />',
            '',
        ].join('\n'),
        { flag: 'wx' },
        (err) => {
            // `wx` never overwrites an existing doc
            if (err) {
                console.log(err.message);

                return;
            }

            console.log(`${languageFolder} file created and content written successfully (asynchronous).`);
        },
    );
}
