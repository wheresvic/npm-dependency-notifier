const Promise = require('bluebird');
const npmCheck = require('npm-check');

const config = require('./config');
const EmailService = require('./EmailService');

const main = async() => {

  console.log(process.argv);

  const ic = await config.init();

  console.log('checking dependencies');
  const currentState = await npmCheck({ cwd: process.argv[2] });

  const packageDifferences = currentState.get('packages');
  const differences = getDifferences(packageDifferences);

  if (differences.length) {
    const content = differences.join('\n');

    console.log('Yikes! Some dependencies are out of date!');
    console.log(content);

    const info = await emailIt({ ic, toAddress: process.argv[3], subject: process.argv[4], content });

    console.log(info);
  } else {
    console.log('All up-to-date, what a surprise!')
  }
};

const getDifferences = (packageDifferences) => {

  const differences = [];

  for (const { bump, moduleName, installed, latest } of packageDifferences) {
    if (bump) {
      differences.push(`${moduleName} ${installed} -> ${latest}`);
    }
  }

  return differences;
};

const emailIt = async({ ic, toAddress, subject, content }) => {
  const emailService = new EmailService(ic.EMAIL_USERNAME, ic.EMAIL_PASSWORD);
  const sendEmailAsync = Promise.promisify(emailService.sendEmail, { context: emailService });

  const info = await sendEmailAsync(
    toAddress,
    subject,
    content,
    null
  );

  return info;
}

Promise.resolve(main())
  .catch(console.error);
