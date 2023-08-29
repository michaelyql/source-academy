import { square, circle, blank, ribbon } from 'rune';

import { stack, beside, show, beside_frac, stack_frac } from 'rune';


function moony_1(bottom_right) {
    return beside(
              stack(circle, square), 
              stack(blank, bottom_right));
}

show(moony_1(ribbon));

function moony_2(n) {
    return n === 1 
        ? circle 
        : moony_1(moony_2(n - 1));
}

show(moony_2(5));

function moony_helper(n, bottom_right) {
    return beside_frac(
        1 / n, 
        stack_frac(1 / n, circle, square),
        stack_frac(1 / n, blank, bottom_right));
}

function moony(n) {
    return n === 1 
        ? circle 
        : moony_helper(n, moony(n - 1));
}

show(moony(5));

// 4. solutions give rise to recursive function 
// moony() uses O(n) space 
// assuming that each rune takes O(1) space in storage  
