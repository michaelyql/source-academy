// import everything so I don't have to keep referring back (bad practice)
// single line comments syntax
/* multi line comment syntax */

// colours
import { 
    black, blue, brown, green, indigo, orange, pink, 
    purple, red, white, yellow, random_color } from 'rune';

// runes 
import { 
    blank, circle, corner, heart, ribbon, nova,
    pentagram, rcross, sail, square } from 'rune';

// layout, display, transforms
import { 
    show, beside, beside_frac, flip_horiz, flip_vert, repeat_pattern,
    turn_upside_down, stack, stackn, stack_frac, translate, 
    scale, scale_independent, rotate, quarter_turn_right,
    quarter_turn_left, overlay, overlay_frac, make_cross } from 'rune';

// special effects 
import { anaglyph, hollusion } from 'rune';

show(flip_vert(heart));
show(ribbon);
show(flip_horiz(ribbon));
show(pentagram);
show(square);
show(blank);
show(circle);
show(stackn(5, heart));

function quilt(m, n, rune) {
    return stackn(m, quarter_turn_right(stackn(n, quarter_turn_left(heart))));
}

show(make_cross(heart)); // the default unflipped rune is in bottom left
// top left is one quarter turn right
// top right is two quarter turns right
// bottom right is three quarter turns right
show(make_cross(rcross));

show(anaglyph(quilt(6, 6, heart)));
show(repeat_pattern(3, make_cross, nova));
