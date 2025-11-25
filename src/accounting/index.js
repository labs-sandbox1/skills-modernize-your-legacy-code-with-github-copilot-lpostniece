// Node.js Student Account System
// Preserves COBOL business logic, data integrity, and menu options

const fs = require('fs');
const readline = require('readline');
const BALANCE_FILE = './balance.json';

function readBalance() {
    if (!fs.existsSync(BALANCE_FILE)) {
        fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: 1000.00 }));
    }
    const data = fs.readFileSync(BALANCE_FILE);
    return JSON.parse(data).balance;
}

function writeBalance(balance) {
    fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance }));
}

function displayMenu() {
    console.log('\nStudent Account System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
}

module.exports = { readBalance, writeBalance };

if (require.main === module) {
    main();
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let running = true;
    while (running) {
        displayMenu();
        const choice = await new Promise(res => rl.question('Select an option: ', res));
        let balance = readBalance();
        switch (choice.trim()) {
            case '1':
                console.log(`Current balance: $${balance.toFixed(2)}`);
                break;
            case '2':
                const credit = await new Promise(res => rl.question('Enter credit amount: ', res));
                const creditAmount = parseFloat(credit);
                if (creditAmount > 0) {
                    balance += creditAmount;
                    writeBalance(balance);
                    console.log(`Amount credited. New balance: $${balance.toFixed(2)}`);
                } else {
                    console.log('Invalid credit amount.');
                }
                break;
            case '3':
                const debit = await new Promise(res => rl.question('Enter debit amount: ', res));
                const debitAmount = parseFloat(debit);
                if (debitAmount > 0) {
                    if (balance >= debitAmount) {
                        balance -= debitAmount;
                        writeBalance(balance);
                        console.log(`Amount debited. New balance: $${balance.toFixed(2)}`);
                    } else {
                        console.log('Insufficient funds for this debit.');
                    }
                } else {
                    console.log('Invalid debit amount.');
                }
                break;
            case '4':
                running = false;
                break;
            default:
                console.log('Invalid option.');
        }
    }
    rl.close();
}
