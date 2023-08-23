import { 
    quarter_turn_left, quarter_turn_right,
    stack_frac, beside_frac, stackn,
    make_cross, nova, rcross, show
} from 'rune';

// Helper functions
function beside_n(n, pattern) {
    return quarter_turn_right(stackn(n, quarter_turn_left(pattern))); 
}

function persian(pattern, n) {
    // Make individual components
    const row = beside_n(n, pattern);
    const center = make_cross(pattern); 
    const side = stackn(n-2, pattern);
    
    // Make middle rows
    const cenPlusLeft = beside_frac(1/(n-1), side, center); 
    const cenPlusLeftAndRight = beside_frac((n-1)/n, cenPlusLeft, side);
    
    // Combine top, bottom and middle runes
    const topPlusCenter = stack_frac(1/(n-1), row, cenPlusLeftAndRight);
    const topPlusCenterPlusBottom = stack_frac((n-1)/n, topPlusCenter, row);
    
    // Display
    show(topPlusCenterPlusBottom);
}

// persian() arranges the runes as such:
// ------- Top --------- 
// Side | Pattern | Side 
// Side | Pattern | Side 
// ------ Bottom -------- 
// Top and bottom rows have dimensions (1 x n)
// Side columns have dimensions (n-2) x 1 
// Center pattern has dimensions (n-2) x (n-2) 

// For example: (n=8)
// T T T T T T T T
// S - - - - - - S
// S - - - - - - S
// S - - - - - - S
// S - - - - - - S
// S - - - - - - S
// S - - - - - - S
// B B B B B B B B 

persian(make_cross(rcross), 5);
persian(make_cross(rcross), 9);
persian(nova, 6);