import { 
    quarter_turn_left, quarter_turn_right,
    stack_frac, beside_frac, stackn,
    make_cross, nova, rcross, show, 
    stack, black, square, blank
} from 'rune';

// Helper functions
function beside_n(n, pattern) {
    return quarter_turn_right(stackn(n, quarter_turn_left(pattern))); 
}

function fractal(rune, n) { 
    return n === 1 
           ? rune
           : beside_frac(1/2, 
                         rune,
                         stackn(2, fractal(rune, n-1)));
}

// show(fractal(make_cross(rcross), 3));

function hook(frac) {
    return stack(square, beside_frac(1-frac, blank, square));
}

// show(hook(1));
// show(hook(0));
// show(hook(1/5));
