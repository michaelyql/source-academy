// 2014/2015 finals

// q1
let p1 = list(pair(1,2),pair(3,4));
set_tail(head(p1), tail(p1));
let p2 = list(list(1, pair(3,4)), pair(3,4));
// display_list(p1);

function n_of_n_stream() {
    let curr = 1;
    function helper(n) {
        if (n > curr) {
            curr = curr + 1;
            return helper(1);
        } else {
            return pair(curr, () => helper(n + 1));
        }
    }
    return helper(1);
}

const a = n_of_n_stream();
// display_list(eval_stream(a, 10));

function table_to_snake_list(table, height, width) {
    let curr = null;
    for (let i = 0; i < height; i = i + 1) {
        if (i % 2 === 0) {
            for (let j = 0; j < width; j = j + 1) {
                curr = pair(table[i][j], curr);
            }
        } else {
            for (let j = width - 1; j >= 0; j = j - 1) {
                curr = pair(table[i][j], curr);
            }
        }
    }
    return reverse(curr);
}

let table = [[1, 2, 3],
             [4, 5, 6],
             [7, 8, 9],
             [10, 11, 12]];
// display_list(table_to_snake_list(table, 4, 3));

// q2
function mergeA(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        if (head(xs) < head(ys)) {
            return pair(head(xs), mergeA(tail(xs), ys));
        } else {
            return pair(head(ys), mergeA(xs, tail(ys)));
        }
    }
}
// display_list(mergeA(list(1,3,7,9), list(2,3,5,6,11)));
function mergeB(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        if (head(xs) < head(ys)) {
            set_tail(xs, mergeB(tail(xs), ys));
            return xs;
        } else {
            set_tail(ys, mergeB(xs, tail(ys)));
            return ys;
        }
    }
}
// display_list(mergeB(list(1,3,7,9), list(2,3,5,6,11)));
function mergeC(xs, xs_len, ys, ys_len) {
    let result = [];
    let result_len = xs_len + ys_len;
    if (xs_len === 0) {
        return ys;
    } else if (ys_len === 0) {
        return xs;
    } else {
        let xp = 0;
        let yp = 0;
        for (let i = 0; i < result_len; i = i + 1) {
            if (is_undefined(xs[xp])) {
                result[i] = ys[yp];
                yp = yp + 1;
            } else if (is_undefined(ys[yp])) {
                result[i] = xs[xp];
                xp = xp + 1;
            } else if (xs[xp] < ys[yp]) {
                result[i] = xs[xp];
                xp = xp + 1;
            } else {
                result[i] = ys[yp];
                yp = yp + 1;
            }
        }
        return result;
    }
}
// display(mergeC([1,3,7,9], 4, [2,3,5,6,11], 5));

// q3
function are_equal_sets(set1, set2) {
    if (is_null(set1)) {
        return is_null(set2);
    } else if (is_null(set2)) {
        return false;
    } else if (length(set1) !== length(set2)) {
        return false;
    } 
    function contains(val, xs) {
        let found = false;
        while (!is_null(xs)) {
            if (head(xs) === val) {
                found = true;
                break;
            }
            xs = tail(xs);
        }
        return found;
    }
    const bools = map(x => contains(x, set1),
                      set2); 
    return accumulate((x, acc) => x && acc,
                      true,
                      bools);
}
// display(are_equal_sets(list(6,3,5,8), list(8,3,5,6)));

function powerset(set) {
    if (is_null(set)) {
        return list(null);
    }
    const curr = head(set);
    const excludes_curr = powerset(remove(curr, set));
    const includes_curr = map(s => pair(curr, s), 
                              excludes_curr);
    return append(excludes_curr, includes_curr);
}
// display_list(powerset(list(1,2,3,4)));

// q4
function make_circular_copy(xs) {
    let start = null;
    while (!is_null(xs)) {
        start = append(start, list(head(xs)));
        xs = tail(xs);
    }
    let end = start;
    while (!is_null(tail(end))) {
        end = tail(end); 
    }
    set_tail(end, start);
    return start;
}
// list_ref(make_circular_copy(list(1, 2, 3)), 4);
function make_linear(xs) {
    let t = xs;
    while (tail(t) !== xs) {
        display(1);
        t = tail(t); 
    }
    set_tail(t, null);
}
// let xs = list(1,2,3);
// let ys = make_circular_copy(xs);
// make_linear(ys);
// equal(xs, ys);
