#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code.
let myBalance = 50000; // Dollar
let myPin = 7777;
// Print welcome message
console.log(chalk.redBright("\n \tWelcome to Samrah02 - ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.yellow("Enter your pin code"),
        type: "number"
    }
]);
// 12345 === 1234 - false
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nPin is Correct , Login Successfully!\n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "please select option",
            type: "list",
            choices: ["withdraw amount", "check balance"]
        }
    ]);
    console.log(operationAns);
    if (operationAns.operation === "withdraw amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "select a withdrawl method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "select Amount:",
                    choices: [10000, 20000, 30000, 40000, 50000],
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} withdraw successfully`);
                console.log(chalk.blue(`Your Remaining Balance is: ${myBalance}`));
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "enter the amount to withdraw:",
                    type: "number"
                }
            ]);
            // =, -=, +=
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.green(`${amountAns.amount} withdraw successfully`));
                console.log(chalk.blue(`Your Remaining Balance is: ${myBalance}`));
            }
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log(chalk.blue(`Your Account Balance is: ${myBalance}`));
    }
}
else {
    console.log(chalk.red("Pin is Incorrect, Try again!"));
}
// Complete Code
