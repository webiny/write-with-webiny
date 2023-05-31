However, to set up Webiny CMS locally, the following are required:

- An AWS account
- Node.js v16.14
- Yarn ^1.22.0 || >=2 - Webiny CMS works with both yarn versions
- IDE

If you don't have an AWS account, then you need to open an AWS account. Thereafter, you should configure your user credentials for programmatic access. You can follow this guide on [how to open an AWS account and configure your user credentials locally](https://www.webiny.com/docs/infrastructure/aws/configure-aws-credentials).

Now, let's create our Webiny project. To do that, you need to run this command in a CLI environment:

```
npx create-webiny-project webiny-cms
```

On running the command, you will prompted to answer some questions in the terminal. One of the questions is about the storage options available to you.

You can select between **DynamoDB** and **DynamoDB + Elasticsearch**. The option to pick depends on the size of your database. For a large database, using **DynamoDB + Elasticsearch** storage option would be best. For this tutorial, you can select the **DynamoDB** storage option.

On answering the prompt questions, the project should get installed locally on your machine. However, to use it via browser, you need to deploy the project into your AWS account. You do that with this command:

```
yarn webiny deploy
```