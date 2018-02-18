# npm-dependency-notifier

A simple application that checks for outdated dependencies and sends out an email if found. It uses `npm-check` to check and `nodemailer` to send out emails.

## Execution

```bash
npm install
cp .env.dist .env # fill in secret values
node src/index <package.json root> <to email address> <email subject>
```

Example:

```bash
node src/index ~/npq/ewolo/easy-workout-log victorparmar@gmail.com "easy-workout-log dependency update"
```

## Testing

```bash
npm test
```
