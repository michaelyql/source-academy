// =================================================================== 
// =================================================================== 

// import * from 'runes';

import { 
    black, blue, brown, green, indigo, orange, pink, 
    purple, red, white, yellow, random_color } from 'rune';

import { 
    blank, circle, corner, heart, ribbon, nova,
    pentagram, rcross, sail, square } from 'rune';

import { 
    show, beside, beside_frac, flip_horiz, flip_vert, repeat_pattern,
    turn_upside_down, stack, stackn, stack_frac, translate, 
    scale, scale_independent, rotate, quarter_turn_right,
    quarter_turn_left, overlay, overlay_frac, make_cross } from 'rune';

import { anaglyph, hollusion } from 'rune';

// =================================================================== 
// =================================================================== 

const x = blank;
const r = red(square);
const lr = overlay_frac(0.50, blank, r);
const b = black(square);
const grey = overlay_frac(0.5, blank, b);
const o = orange(square);
const w = white(square);
const y = yellow(square);
const bl = overlay_frac(0.25, blank, blue(square));
const dbl = blue(square);
const lbl = overlay_frac(0.75, blank, blue(square));
const ind = indigo(square);
const br = brown(square);
const lbr = overlay_frac(0.25, blank, br);

// Makes a row that is 8 runes wide
function row_8bit(a, b, c, d, e, f, g, h) {
    return beside_frac(1 / 8, a, 
                beside_frac(1 / 7, b, 
                    beside_frac(1 / 6, c, 
                        beside_frac(1 / 5, d, 
                            beside_frac(1 / 4, e, 
                                beside_frac(1 / 3, f, 
                                    beside_frac(1 / 2, g, h)))))));
}

// Makes a row that is 24 runes wide
function row_24bit(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, 
s, t, u, v, w, xx) {
    // xx used here to avoid name conflict with blank rune 'x'
    const zero_to_7 = row_8bit(a, b, c, d, e, f, g, h);
    const eight_to_15 = row_8bit(i, j, k, l, m, n, o, p);
    const sixteen_to_23 = row_8bit(q, r, s, t, u, v, w, xx);
    
    return beside_frac(1 / 3, zero_to_7, 
                beside_frac(1 / 2, eight_to_15, sixteen_to_23));
}

// Stack 8 rows on top of each other
function stack_rows(r1, r2, r3, r4, r5, r6, r7, r8) {
    return stack_frac(1 / 8, r1, 
                stack_frac(1 / 7, r2, 
                    stack_frac(1 / 6, r3, 
                        stack_frac(1 / 5, r4, 
                            stack_frac(1 / 4, r5, 
                                stack_frac(1 / 3, r6, 
                                    stack_frac(1 / 2, r7, r8)))))));
}

// Compose the final 24x24 rune
function make_grid(row_1_to_8, row_9_to_16, row_17_to_24) {
    return stack_frac(1 / 3, row_1_to_8, 
                stack_frac(1 / 2, row_9_to_16, row_17_to_24));
}

// Empty row that is 24 runes wide
function empty_row24bit(bg_color) {
    function beside_n(n, rune) {
        return quarter_turn_right(stackn(n, quarter_turn_left(bg_color(rune))));
    }
    return beside_n(24, square);
}


function charizard(bg_color) {
    
    // Empty row constant
    const er = empty_row24bit(bg_color);
    const x = bg_color(square);

    // row 1 to 8
    const r4 = row_24bit(x, x, x, x, x, x, b, b, b, b, x, x, x, x, x, x, 
    x, x, x, b, x, x, x, x);
    const r5 = row_24bit(x, x, x, x, x, b, o, o, o, o, b, x, x, x, x, x,
    x, x, b, r, b, x, x, x);
    const r6 = row_24bit(x, x, x, x, b, o, o, o, o, o, o, b, x, x, x, x,
    x, x, b, r, r, b, x, x);
    const r7 = r6;
    const r8 = row_24bit(x, x, x, b, o, o, o, o, o, o, o, o, b, x, x, x,
    x, b, r, r, r, r, b, x);
    const row_1_to_8 = stack_rows(er, er, er, r4, r5, r6, r7, r8);
    
    // row 9 to 16
    const r9 = row_24bit(x, x, b, o, o, o, o, w, b, o, o, o, b, x, x, x,
    x, b, r, r, y, r, b, x);
    const r10 = row_24bit(x, x, b, o, o, o, o, b, b, o, o, o, o, b, x, x,
    x, b, r, y, y, r, b, x);
    const r11 = row_24bit(x, x, b, o, o, o, o, b, b, o, o, o, o, b, x, x,
    x, x, b, o, b, b, x, x);
    const r12 = row_24bit(x, x, x, b, o, o, o, o, o, o, o, o, o, o, b, x,
    x, x, b, o, b, x, x, x);
    const r13 = row_24bit(x, x, x, x, b, b, o, o, o, o, o, o, o, o, o, b, 
    x, b, o, o, b, x, x, x);
    const r14 = row_24bit(x, x, x, x, x, x, b, b, b, o, o, b, o, o, o, b, 
    b, o, o, b, x, x, x, x);
    const r15 = row_24bit(x, x, x, x, x, x, x, b, y, y, b, o, o, o, o, o, 
    b, o, o, b, x, x, x, x);
    const r16 = row_24bit(x, x, x, x, x, x, x, b, y, y, y, b, b, o, o, o,
    b, o, b, x, x, x, x, x);
    const row_9_to_16 = stack_rows(r9, r10, r11, r12, r13, r14, r15, r16);
    
    // row 17 to 24
    const r17 = row_24bit(x, x, x, x, x, x, b, w, b, b, y, y, o, o, o, o, 
    b, b, x, x, x, x, x, x);
    const r18 = row_24bit(x, x, x, x, x, x, x, b, b, b, y, y, o, o, o, o,
    b, b, x, x, x, x, x, x);
    const r19 = row_24bit(x, x, x, x, x, x, x, x, x, x, b, b, b, o, b, b, 
    x, x, x, x, x, x, x, x);
    const r20 = row_24bit(x, x, x, x, x, x, x, x, x, x, x, b, w, o, w, b,
    x, x, x, x, x, x, x, x);
    const r21 = row_24bit(x, x, x, x, x, x, x, x, x, x, x, x, b, b, b, b,
    x, x, x, x, x, x, x, x);
    const row_17_to_24 = stack_rows(r17, r18, r19, r20, r21, er, er, er);
    
    const charizard = make_grid(row_1_to_8, row_9_to_16, row_17_to_24);
    return charizard;
}

function squirtle(bg_color) {
    
    // Empty row constant
    const er = empty_row24bit(bg_color);
    const x = bg_color(square);
    
    // row 1 to 8
    const r4 = row_24bit(x, x, x, x, b, b, b, b, x, x, x, x, x, x, x,
    x, x, b, b, b, x, x, x, x);
    const r5 = row_24bit(x, x, x, b, lbl, lbl, lbl, lbl, b, b, x, x, x, x,
    x, x, b, bl, bl, bl, b, x, x, x);
    const r6 = row_24bit(x, x, b, lbl, lbl, lbl, lbl, lbl, lbl, lbl, b, b, x, x,
    x, b, bl, bl, bl, bl, bl, b, x, x);
    const r7 = row_24bit(x, x, b, lbl, lbl, lbl, lbl, lbl, lbl, lbl, b, lbr, b, 
    b, x, b, bl, bl, bl, b, bl, b, x, x);
    const r8 = row_24bit(x, b, lbr,  lbl, lbl, lbl, lbl, lbl, lbl, lbl, lbl, 
    lbr, lbr, lbr, b, bl, bl, bl, b, bl, bl, b, x, x);
    const row_1_to_8 = stack_rows(er, er, er, r4, r5, r6, r7, r8);

    // row 9 to 16
    const r9 = row_24bit(x, b, lbl, lbl, lbl, lbl, w, b, lbl, lbl, lbl, w, lbr, 
    lbr, lbr, b, bl, bl, b, bl, b, x, x, x);
    const r10 = row_24bit(x, b, lbl, lbl, lbl, lbl, b, lbr, lbl, lbl, lbl, w, 
    lbr, lbr, lbr, b, bl, b, b, b, x, x, x, x);
    const r11 = row_24bit(x, x, b, lbl, lbl, lbl, b, lbr, lbl, lbl, lbl, b, w,
    lbr, lbr, lbr, b, b, x, x, x, x, x, x);
    const r12 = row_24bit(x, x, x, b, b, lbl, lbl, lbl, lbl, b, b, lbl, lbl, w, 
    lbr, lbr, b, x, x, x, x, x, x, x);
    const r13 = row_24bit(x, x, x, b, bl, b, b, b, b, lbl, lbl, lbl, lbl, w, 
    lbr, lbr, b, x, x, x, x, x, x, x); 
    const r14 = row_24bit(x, x, x, x, b, b, y, y, b, lbl, lbl, lbl, b, w, lbr, 
    lbr, b, x, x, x, x, x, x, x);
    const r15 = row_24bit(x, x, x, x, x, x, b, y, y, b, b, b, b, w, lbr, lbr, 
    b, x, x, x, x, x, x, x);
    const r16 = row_24bit(x, x, x, x, x, b, bl, b, y, y, y, y, y, b, w, b, 
    x, x, x, x, x, x, x, x);
    const row_9_to_16 = stack_rows(r9, r10, r11, r12, r13, r14, r15, r16);
    
    // row 17 to 24
    const r17 = row_24bit(x, x, x, x, x, x, b, b, b, b, y, y, bl, b, w, b,
    x, x, x, x, x, x, x, x);
    const r18 = row_24bit(x, x, x, x, x, x, x, x, x, b, b, b, bl, b, b, x, 
    x, x, x, x, x, x, x, x);
    const r19 = row_24bit(x, x, x, x, x, x, x, x, x, x, b, bl, bl, bl, b, x, 
    x, x, x, x, x, x, x, x);
    const r20 = row_24bit(x, x, x, x, x, x, x, x, x, x, x, b, b, b, x, x, 
    x, x, x, x, x, x, x, x);
    const row_17_to_24 = stack_rows(r17, r18, r19, r20, er, er, er, er);

    const squirtle = make_grid(row_1_to_8, row_9_to_16, row_17_to_24);
    return squirtle;
}

function turn_45_right(rune) {
    return rotate(-math_PI / 4, rune);
}

function turn_45_left(rune) {
    return rotate(math_PI / 4, rune);
}

// Rotate clockwise by n degrees
function rotate_d(degree, rune) {
    // Normalize the degree (clamp between 0 to 360)
    function normalize(n) {
        return n <= 360 
            ? n
            : normalize(n - 360);
    }
    const normalized_deg = normalize(degree);
    const rad = -normalized_deg / 180 * math_PI;
    return rotate(rad, rune);
}

show(squirtle(white));
show(charizard(white));

function bulbasaur() {
    return 0;
}

// Creates a repeating pattern of rune1, rune2, rune1, rune2... etc.
function beside_n_alt_helper(n, rune1, rune2, origin) {
    return n < 0 
        ? blank 
        : n === 1
        ? (origin % 2 !== 0 ? rune2 : rune1)
        : n % 2 === 0
        ? beside_frac(
            1 / n,
            rune1,
            beside_n_alt_helper(n - 1, rune1, rune2, origin))
        : beside_frac(
            1 / n, 
            rune2, 
            beside_n_alt_helper(n - 1, rune1, rune2, origin));
}

function beside_n_alternating(n, rune1, rune2) {
    return n % 2 === 0 
        ? beside_n_alt_helper(n, rune1, rune2, n - 1) 
        : beside_n_alt_helper(n, rune1, rune2, n);
}




