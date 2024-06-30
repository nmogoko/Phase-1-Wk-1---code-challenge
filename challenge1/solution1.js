const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function studentGradeGenerator() {
 
        rl.question("Please input your mark ", (mark) => {
            mark = Number(mark);
    
            if (isNaN(mark) || mark < 0 || mark > 100) {
                rl.question("Please enter a mark between 0 and 100? ", (mark1) => {
                    mark1 = Number(mark1);
    
                    if (mark1 > 79) {
                       return("You have an A")
                    } else if (mark1 >= 60 && mark1 <= 79) {
                        return("You have a B")
                    } else if (mark1 > 49 && mark1 < 60) {
                        return("You have a C")
                    } else if (mark1 >= 40 && mark1 <= 49) {
                       return("You have a D")
                    } else {
                        return("You have an E")
                    }
                    rl.close();
                })
            }
            studentGradeGenerator()