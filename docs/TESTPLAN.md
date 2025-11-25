# COBOL Student Account System Test Plan

This test plan covers all business logic implemented in the COBOL student account system. Use this plan to validate the application with business stakeholders and as a basis for future unit and integration tests in Node.js.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|----------------------|----------------|------------|-----------------|--------------|--------------------|----------|
| TC01 | View current balance (TOTAL) | Account exists with initial balance | 1. Start app<br>2. Select 'TOTAL' operation | Current balance is displayed |  |  |  |
| TC02 | Credit account with valid amount | Account exists with initial balance | 1. Start app<br>2. Select 'CREDIT' operation<br>3. Enter valid credit amount | Amount is added to balance; new balance displayed |  |  |  |
| TC03 | Debit account with valid amount (sufficient funds) | Account exists with balance >= debit amount | 1. Start app<br>2. Select 'DEBIT' operation<br>3. Enter valid debit amount | Amount is subtracted from balance; new balance displayed |  |  |  |
| TC04 | Debit account with invalid amount (insufficient funds) | Account exists with balance < debit amount | 1. Start app<br>2. Select 'DEBIT' operation<br>3. Enter debit amount greater than balance | Error message: "Insufficient funds for this debit."; balance unchanged |  |  |  |
| TC05 | Data integrity after credit | Account exists | 1. Credit account<br>2. View balance<br>3. Restart app<br>4. View balance again | Credited amount persists; balance remains correct |  |  |  |
| TC06 | Data integrity after debit | Account exists with sufficient funds | 1. Debit account<br>2. View balance<br>3. Restart app<br>4. View balance again | Debited amount persists; balance remains correct |  |  |  |
| TC07 | Multiple sequential credits | Account exists | 1. Credit account with amount A<br>2. Credit account with amount B<br>3. View balance | Balance reflects sum of credits |  |  |  |
| TC08 | Multiple sequential debits (sufficient funds) | Account exists with sufficient funds | 1. Debit account with amount A<br>2. Debit account with amount B<br>3. View balance | Balance reflects sum of debits |  |  |  |
| TC09 | Attempt to debit with zero or negative amount | Account exists | 1. Select 'DEBIT' operation<br>2. Enter zero or negative amount | Error or rejection; balance unchanged |  |  |  |
| TC10 | Attempt to credit with zero or negative amount | Account exists | 1. Select 'CREDIT' operation<br>2. Enter zero or negative amount | Error or rejection; balance unchanged |  |  |  |

> Fill in Actual Result, Status, and Comments during test execution.
