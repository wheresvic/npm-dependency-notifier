# npm-dependency-notifier

A simple application that checks for outdated dependencies and sends out an email if found. It uses `npm-check` to check and `nodemailer` to send out emails.

## Execution

```bash
npm install
cp .env.dist .env # fill in secret values, note that if both mailgun and gmail credentials are provided, then gmail takes precedence
node src/index <package.json root> <from email address> <to email address> <email subject>
```

Example:

```bash
node src/index . noreply@smalldata.tech vic@smalldata.tech "npm-dependency-notifier dependency update"
```

## Testing

```bash
npm test
```
