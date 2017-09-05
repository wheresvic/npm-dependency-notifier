# npm-dependency-notifier

A simple application that checks for outdated dependencies and sends out an email if found. It uses <code>npm-check</code> to check and <code>nodemailer</code> to send out emails.

## Execution: 

```
npm install
cp .env.dist .env # fill in secret values
node src/index <package.json root> <to email address> <email subject>
```

Example:

```
node src/index ~/npq/easy-workout-log victorparmar@gmail.com "easy-workout-log dependency update"
```

## Testing

```
npm test
```

