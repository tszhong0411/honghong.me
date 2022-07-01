import dedent from 'dedent';
import fs from 'fs';
import inquirer from 'inquirer';

const genFrontMatter = (answers) => {
  let d = new Date();
  const date = [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2),
  ].join('-');

  let frontMatter = dedent`---
  title: ${answers.title ? answers.title : 'Untitled'}
  date: '${date}'
  summary: ${answers.summary ? answers.summary : ' '}
  image: '${answers.image ? answers.image : ' '}'
  `;

  frontMatter = frontMatter + '\n---';

  return frontMatter;
};

inquirer
  .prompt([
    {
      name: 'title',
      message: 'Enter post title:',
      type: 'input',
    },
    {
      name: 'slug',
      message: 'Enter post slug:',
      type: 'input',
    },
    {
      name: 'extension',
      message: 'Choose post extension:',
      type: 'list',
      choices: ['mdx', 'md'],
    },
    {
      name: 'summary',
      message: 'Enter post summary:',
      type: 'input',
    },
    {
      name: 'image',
      message: 'Enter post image:',
      type: 'input',
    },
    {
      name: 'language',
      message: 'Choose post language:',
      type: 'list',
      choices: ['zh-TW', 'en'],
    },
  ])
  .then((answers) => {
    // Remove special characters and replace space with -
    const fileName = answers.slug
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/-+/g, '-');
    const frontMatter = genFrontMatter(answers);
    if (!fs.existsSync('data/blog'))
      fs.mkdirSync('data/blog', { recursive: true });
    const filePath = `data/blog/${fileName ? fileName : 'untitled'}.${
      answers.language
    }.${answers.extension ? answers.extension : 'md'}`;
    fs.writeFile(filePath, frontMatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`Blog post generated successfully at ${filePath}`);
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log(error);
      console.log('Something went wrong, sorry!');
    }
  });
