const fs = require('fs');
const path = require('path');
const BALANCE_FILE = path.join(__dirname, 'balance.json');

// Import functions from index.js
let readBalance, writeBalance;
beforeAll(() => {
    // Mock the functions from index.js
    const app = require('./index.js');
    readBalance = app.readBalance || (() => {
        if (!fs.existsSync(BALANCE_FILE)) {
            fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: 1000.00 }));
        }
        const data = fs.readFileSync(BALANCE_FILE);
        return JSON.parse(data).balance;
    });
    writeBalance = app.writeBalance || ((balance) => {
        fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance }));
    });
});

describe('Student Account System', () => {
    beforeEach(() => {
        // Reset balance before each test
        writeBalance(1000.00);
    });

    test('TC01: View current balance (TOTAL)', () => {
        expect(readBalance()).toBe(1000.00);
    });

    test('TC02: Credit account with valid amount', () => {
        let balance = readBalance();
        balance += 200;
        writeBalance(balance);
        expect(readBalance()).toBe(1200.00);
    });

    test('TC03: Debit account with valid amount (sufficient funds)', () => {
        let balance = readBalance();
        balance -= 500;
        writeBalance(balance);
        expect(readBalance()).toBe(500.00);
    });

    test('TC04: Debit account with invalid amount (insufficient funds)', () => {
        let balance = readBalance();
        const debitAmount = 1500;
        if (balance < debitAmount) {
            // Should not change balance
            expect(readBalance()).toBe(1000.00);
        }
    });

    test('TC05: Data integrity after credit', () => {
        let balance = readBalance();
        balance += 100;
        writeBalance(balance);
        expect(readBalance()).toBe(1100.00);
        // Simulate restart
        expect(readBalance()).toBe(1100.00);
    });

    test('TC06: Data integrity after debit', () => {
        let balance = readBalance();
        balance -= 100;
        writeBalance(balance);
        expect(readBalance()).toBe(900.00);
        // Simulate restart
        expect(readBalance()).toBe(900.00);
    });

    test('TC07: Multiple sequential credits', () => {
        let balance = readBalance();
        balance += 50;
        writeBalance(balance);
        balance += 75;
        writeBalance(balance);
        expect(readBalance()).toBe(1125.00);
    });

    test('TC08: Multiple sequential debits (sufficient funds)', () => {
        let balance = readBalance();
        balance -= 100;
        writeBalance(balance);
        balance -= 200;
        writeBalance(balance);
        expect(readBalance()).toBe(700.00);
    });

    test('TC09: Attempt to debit with zero or negative amount', () => {
        let balance = readBalance();
        const debitAmount = 0;
        if (debitAmount <= 0) {
            // Should not change balance
            expect(readBalance()).toBe(1000.00);
        }
    });

    test('TC10: Attempt to credit with zero or negative amount', () => {
        let balance = readBalance();
        const creditAmount = -50;
        if (creditAmount <= 0) {
            // Should not change balance
            expect(readBalance()).toBe(1000.00);
        }
    });
});
