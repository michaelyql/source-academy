// 2015/2016 finals

// q1a
// let input = list(3, 4, null);
// let result = list(input, pair(input, null));
// draw_data(result);

// q1b
// let input = list(1, pair(2, 3), list(4));
// let result = map(x => x, input);
// draw_data(result);

// q1c
// let x = list(5);
// let result = pair(3, pair(pair(7, x), x));
// draw_data(result);

// q1d
// let x = list(5);
// let result = pair(3, pair(pair(7, x), x));
// draw_data(result);

// q1e
// let result = list(null);
// set_tail(result, list(result));
// set_tail(tail(result), list(tail(result)));
// draw_data(result);

// q3
let n = 5;
function outer_loop(x) {
    function inner_loop(y) {
        if (y < x) {
            display("x: " + stringify(x) + ", y: " + stringify(y)); 
            inner_loop(y + 1);
        } else {
            outer_loop(x * 2); 
        }
    }
    if (x < n) {
        inner_loop(0);
    }
}
// outer_loop(1);

function double_loop(x, y) {
    if (x < n) {
        if (y < x) {
            display("x: " + stringify(x) + ", y: " + stringify(y)); 
            double_loop(x, y + 1);
        } else {
            double_loop(x * 2, 0);
        }
    }
}
// double_loop(1, 0);

// q4
function circular_right_shift(arr) {
    let height = array_length(arr);
    let width = array_length(arr[0]);
    let last_col = [];
    for (let i = 0; i < height; i = i + 1) {
        last_col[i + 1] = arr[i][width - 1];
    }
    last_col[0] = arr[height - 1][width - 1];
    for (let i = 0; i < height; i = i + 1) {
        for (let j = width - 1; j > 0; j = j - 1) {
            arr[i][j] = arr[i][j - 1];
        }
        arr[i][0] = last_col[i];
    }
}
let arr = [[1, 2, 3],
           [4, 5, 6],
           [7, 8, 9],
           [10, 11, 12]];
circular_right_shift(arr);
// display(arr);

// q5
function mutable_reverse(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return null;
    } 
    function helper(prev, curr) {
        if (is_null(tail(curr))) {
            set_tail(curr, prev);
            return curr;
        } else {
            let next = tail(curr);
            set_tail(curr, prev);
            return helper(curr, next);
        }
    }
    let next = tail(xs);
    set_tail(xs, null);
    return helper(xs, next);
}
let as = list(1, 2, 3, 4, 5);
let bs = mutable_reverse(as);
// display_list(bs);
// display_list(as);

// q7
function make_binary_tream(start) {
    return pair(start,
                () => pair(make_binary_tream(start + 1), 
                           () => pair(make_binary_tream(start * 2),
                                      () => null)));
}
const b = make_binary_tream(1);
// display(head(b)); // 1
// display(head(stream_tail(b))); // 2
// head(head(stream_tail(stream_tail(b)))); // 2

function tree_to_tream(tree) {
    if (is_null(tree)) {
        return null;
    }
    let node = head(tree);
    let left_child = head(tail(tree));
    let right_child = head(tail(tail(tree)));
    let right_tream = !is_null(right_child) && is_list(right_child)
                      ? () => tree_to_tream(right_child)
                      : is_number(right_child)
                      ? () => pair(right_child, () => null)
                      : () => null;
    let left_tream = !is_null(left_child) && is_list(left_child)
                     ? () => pair(tree_to_tream(left_child), right_tream)
                     : is_number(left_child)
                     ? () => pair(left_child, right_tream) 
                     : () => pair(null, right_tream);
    return pair(node, left_tream);
}
let tt = tree_to_tream(list(1, list(2, 4, 5), list(3, null, null)));
// stream_ref(tt, 1); // 2
// stream_ref(tt, 2); // 3
// stream_tail(head(stream_tail(tt))); // 4
// stream_tail(stream_tail(head(stream_tail(tt)))); // 5

function tream_map(f, t) {
    if (is_null(t)) {
        return null;
    } else {
        return is_pair(head(t))
               ? pair(tream_map(f, head(t)),
                      () => tream_map(f, stream_tail(t)))
               : pair(f(head(t)), 
                      () => tream_map(f, stream_tail(t)));
    }
}
const ty = tream_map(x => x * 2, tt);
// stream_ref(ty, 0); // 2
// stream_ref(ty, 1); // 4
// stream_ref(ty, 2); // 6
// stream_tail(head(stream_tail(ty))); // 8
// stream_tail(stream_tail(head(stream_tail(ty)))); // 10