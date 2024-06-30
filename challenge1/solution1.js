const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function studentGradeGenerator() {
    rl.question("Please input your mark ", (mark) => {
    
        if (isNaN(mark) || mark < 0 || mark > 100) {
            console.log("Invalid mark. Try Again!");
            studentGradeGenerator();
        } else {
            mark = Number(mark);

            if (mark > 79) {
                console.log("You have an A")
            } else if (mark >= 60 && mark <= 79) {
                console.log("You have a B")
            } else if (mark > 49 && mark < 60) {
                console.log("You have a C")
            } else if (mark >= 40 && mark <= 49) {
                console.log("You have a D")
            } else {
                console.log("You have an E")
            }
            rl.close();
        }
    })
}

studentGradeGenerator();