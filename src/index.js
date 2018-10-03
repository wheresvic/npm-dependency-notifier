const Promise = require("bluebird");
const npmCheck = require("npm-check");

const config = require("./config");
const EmailService = require("./EmailService");

const main = async () => {
  console.log(process.argv);

  const ic = await config.init();

  console.log("checking dependencies");
  const currentState = await npmCheck({ cwd: process.argv[2] });

  const packageDifferences = currentState.get("packages");
  const differences = getDifferences(packageDifferences);

  if (differences.length) {
    const content = differences.join("\n");

    console.log("Yikes! Some dependencies are out of date!");
    console.log(content);

    const info = await emailIt({
      ic,
      fromAddress: process.argv[3],
      toAddress: process.argv[4],
      subject: process.argv[5],
      text: content
    });

    console.log(info);
  } else {
    console.log("All up-to-date, what a surprise!");
  }
};

const getDifferences = packageDifferences => {
  const differences = [];

  for (const { bump, moduleName, installed, latest } of packageDifferences) {
    if (bump) {
      differences.push(`${moduleName} ${installed} -> ${latest}`);
    }
  }

  return differences;
};

const emailIt = async ({ ic, fromAddress, toAddress, subject, text }) => {
  const emailService = new EmailService({
    mailgunApiKey: ic.MAILGUN_API_KEY,
    mailgunDomain: ic.MAILGUN_DOMAIN,
    gmailUsername: ic.GMAIL_USERNAME,
    gmailPassword: ic.GMAIL_PASSWORD
  });
  const sendEmailAsync = Promise.promisify(emailService.sendEmail, { context: emailService });

  const info = await sendEmailAsync({ fromAddress, toAddress, subject, text, htmlText: null });

  return info;
};

Promise.resolve(main()).catch(console.error);
