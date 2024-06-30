const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let totalAllowancePlusBasicSalary = 0;

function getBasicSalary() {
    rl.question("What is your monthly basic salary? ", (basicSalary) => {
        if (isNaN(basicSalary) || basicSalary < 0) {
            console.log("Invalid basic salary. Try again.");
            getBasicSalary();
        } else {
            totalAllowancePlusBasicSalary += Number(basicSalary);
            getHouseAllowance();    
        }
    })
}

function getHouseAllowance() {
    rl.question("What is your monthly house allowance? ", (houseAllowance) => {
        if (isNaN(houseAllowance) || houseAllowance < 0) {
            console.log("Invalid house allowance. Try again.");
            getHouseAllowance();
        } else {
            totalAllowancePlusBasicSalary += Number(houseAllowance);
            getMedicalAllowance();    
        }
    })
}

function getMedicalAllowance() {
    rl.question("What is your monthly medical allowance? ", (medicalAllowance) => {
        if (isNaN(medicalAllowance) || medicalAllowance < 0) {
            console.log("Invalid medical allowance. Try again.");
            getMedicalAllowance();
        } else {
            totalAllowancePlusBasicSalary += Number(medicalAllowance);

            totalAllowancePlusBasicSalary = Number(totalAllowancePlusBasicSalary);

            const tax = calculateTax(totalAllowancePlusBasicSalary);
            const NHIF = calculateNHIF(totalAllowancePlusBasicSalary);
            const NSSF = calculateNSSF(totalAllowancePlusBasicSalary);

            console.log(`Your gross pay is: ${totalAllowancePlusBasicSalary}`);
            console.log(`Your Tax before relief is: ${tax}`);
            console.log(`Your Tax after relief is: ${tax - 2400}`);
            console.log(`Your NHIF charge is: ${NHIF}`);
            console.log(`Your NSSF charge is: ${NSSF}`);
            console.log(`Your Net income after tax, NHIF, and NSSF deductions is: ${totalAllowancePlusBasicSalary + 2400 - tax - NHIF - NSSF}`);
            
            rl.close();   
        }
    })
}

// function to calculate TAX
// These are rates that are in effect from 1 July 2023
function calculateTax(income) {
    let tax = 0;

    // Define the monthly tax brackets and rates
    const brackets = [
        { limit: 24000, rate: 0.10 },
        { limit: 32333, rate: 0.25 },
        { limit: 500000, rate: 0.30 },
        { limit: 800000, rate: 0.325 },
        { limit: Number.MAX_VALUE, rate: 0.35 }
    ];

    // Sort the brackets in ascending order of their limits
    brackets.sort((a, b) => a.limit - b.limit);

    let previousLimit = 0;

    for (let i = 0; i < brackets.length; i++) {
        let bracket = brackets[i];

        if (income > previousLimit) {
            let taxableIncome = Math.min(income, bracket.limit) - previousLimit;
            tax += taxableIncome * bracket.rate;
            previousLimit = bracket.limit;
        }
    }

    if (income > brackets[brackets.length - 1].limit) {
        tax += (income - brackets[brackets.length - 1].limit) * brackets[brackets.length - 1].rate;
    }

    return tax;
}

/*
    * A function to calculate NSSF charges based on Tier I contribution which is capped at 7,000
    * and has a rate of 6%
*/
function calculateNSSF(income) {
    const rate = 0.06;
    const cap = 7000;
    
    let nssf = income * rate;

    if (nssf > cap) {
        nssf = cap;
    }

    return nssf;
}

// function to calculate NHIF
function calculateNHIF(income) {
    const brackets = [
        { min: 0, max: 5999, charge: 150 },
        { min: 6000, max: 7999, charge: 300 },
        { min: 8000, max: 11999, charge: 400 },
        { min: 12000, max: 14999, charge: 500 },
        { min: 15000, max: 19999, charge: 600 },
        { min: 20000, max: 24999, charge: 750 },
        { min: 25000, max: 29999, charge: 850 },
        { min: 30000, max: 34999, charge: 900 },
        { min: 35000, max: 39999, charge: 950 },
        { min: 40000, max: 44999, charge: 1000 },
        { min: 45000, max: 49999, charge: 1100 },
        { min: 50000, max: 59999, charge: 1200 },
        { min: 60000, max: 69999, charge: 1300 },
        { min: 70000, max: 79999, charge: 1400 },
        { min: 80000, max: 89999, charge: 1500 },
        { min: 90000, max: 99999, charge: 1600 },
        { min: 100000, max: Number.MAX_VALUE, charge: 1700 }
    ];

    for (let bracket of brackets) {
        if (income >= bracket.min && income <= bracket.max) {
            return bracket.charge;
        }
    }

    // Default to 0 if no bracket matches (shouldn't happen with the provided brackets)
    return 0;
}

getBasicSalary();