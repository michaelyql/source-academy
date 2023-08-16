
display("accumulate");


function square(x) {
    return x * x;
}

display(square(9));

function wasteTime(x) {
    display("wasting time");
    display(x);
    return x === 0 ? "Done" : wasteTime(x-1);
}

const timeNow = get_time();

wasteTime(5);

const timeAfter = get_time();

display(timeAfter);
display(timeNow);

display(timeAfter - timeNow, "Elapsed time: ");

const name = prompt("enter your name: ");
display(name, "Hello, ");

display(arity(wasteTime));

display("the character at index 1 is ");
display(char_at(name, 1));