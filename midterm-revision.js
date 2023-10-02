// Useful formula: Sum of geometric progression
// Infinite series, |r| < 1 ----  S  = a / (1 - r)
// 1 + 1/2 + 1/4 + ... 1/2^k = 2 
// Finite series, S = a * (r^n - 1) / (r - 1) OR S = a * (1 - r^n) / (1 - r), r != 1
// 1 + 2 + 4 + ... + n = 2^(n+1) - 1
// 1 + 2 + 3 + ... + n = n * (n + 1) / 2 (Arithmetic progression)
// Remember to consider the space and time complexity for ALL functions
// Discard the smaller terms when appropriate

function permutations(s) { // Ω(n*n!) time and space
    return is_null(s) 
           ? list(null)
           : accumulate(append, null, 
                        map(x => map(p => pair(x, p), 
                                     permutations(remove(x, s))),
                            s));
}

function smallest(xs) { // Θ(2^n) time, Θ(n) space
    return tail(xs) === null 
           ? head(xs) 
           : head(xs) < smallest(tail(xs)) 
           ? head(xs) 
           : smallest(tail(xs));
}
function sort(xs) { // Θ(2^n) space, Θ(n) space
    if (xs === null) {
        return xs;
    } else {
        const x = smallest(xs); 
        return pair(x, sort(remove(x, xs)));
    }
}
function smallest2(xs) { // Θ(n^2) time, Θ(n) space
    // using this version, sort(xs) becomes Θ(n^3) time and Θ(n) space
    return length(xs) === 1 
           ? head(xs)
           : min(head(xs), smallest2(tail(xs)));
}

function make_up_amount(n, xs) { // Θ(2^n) time, Θ(n) space
    if (n === 0) {
        return 1;
    } else if (x < 0 || xs === null) {
        return 0; 
    } else {
        return make_up_amount(n - head(xs), tail(xs))
            + make_up_amount(n, tail(xs));
    }
}

function take(n, xs) {
    return n === 0 
           ? null 
           : pair(head(xs), take(n - 1, tail(xs)));
}
function drop(n, xs) {
    return n === 0 
           ? xs
           : drop(n - 1, tail(xs));
}
function search(x, xs) { // Θ(n) time, Θ(n) space
    // assume xs is sorted
    is (xs === null) {
        return false;
    } else {
        const m = math_floor(length(xs) / 2);
        if (list_ref(xs, m) === x) {
            return true;
        } else if (x <= list_ref(xs, m)) {
            return search(x, take(m, xs));
        } else {
            return search(x, drop(m + 1, xs));
        }
    }
    // T(n) = Θ(n) + T(n/2) = ... = Θ(n*(1 + 1 / 2 + ... + 1 / 2^k)) = Θ(n) 
}

function search2(f, a, b) { //  Θ(n) time,  Θ(log n) space
    if (a > b) {
        return false;
    } else {
        const m = math_floor((a + b) / 2);
        return f(m) || search2(f, a, m - 1) || search(f, m + 1, b);
    }
}

function f(n) { // Θ(n^2) time, Θ(n) space
    function ff(i) {
        return i < 1 ? i : ff(i - 1);
    }
    return n < 1 ? n : ff(n) + f(n - 1);
}
function g(n) { // Θ(n^5) time, Θ(n^2) space
    return n < 1 ? n : f(n * n) + g(n - 1);
}

function id(n) { // Θ(n) time, Θ(n) space
    return n === 0 ? 0 : 1 + id(n - 1); 
}
function id2(n) { // Θ(n^2) time, Θ(n) space
    return n === 0 ? 0 : 1 + id2(id(n - 1));
}
function id3(n) { // Θ(n^2) time, Θ(n) space
    return n === 0 ? 0 : 1 + id(id3(id(n - 1)));
}
function id4(n) { // Θ(log n) time, Θ(log n) space
    return n < 1 ? n : 2 * id4(n / 2);
}
function id5(n) { // Θ(n log n) time, Θ(n) space
    return n === 0 ? 0 : 1 + id4(id5(id4(n - 1)));
}
function id6(n) { // Θ(n) time, Θ(1) space
    function helper(a, n) {
        return n === 0 ? a : helper(a + 1, n - 1);
    }
    return helper(0, n);
}
function id7(n) { // Θ(n^2) time, Θ(1) space
    function helper(a, n) {
        return n === 0 ? a : helper(id6(a + 1), id6(n - 1));
    }
    return helper(0, n);
}
function id8(n) { // Θ(n^2) time, Θ(n) space
    function helper(a, n) {
        return n === 0 ? a : id6(helper(a + 1, n - 1));
    }
    return helper(0, n);
}
