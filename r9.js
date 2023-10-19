// q1
function make_search(A) {
    //  return x => linear_search(A, x); // always O(n)
}

function make_optimized_search(A) {
    // ???
    // return x => ???;
    
    // merge sort the array first (initial pass n log n)
    // binary search afterwards (log n)
}

// q2
function fib(n) {
    const f = [0, 1];
    for (let i = 2; i <= n; i = i + 1) {
        f[i] = f[i - 1] + f[i - 2];
    }
    return f[n];
}

function fib_1(n) {
    if (n <= 1) {
        return n;
    }
    let a = 0;
    let b = 1;
    for (let i = 2; i <= n; i = i + 1) {
        b = b + a;
        a = b - a;
    }
    return b;
}

// q3
const mem = [];
function read(n, k) {
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

function mchoose(n, k) {
    if (read(n, k) !== undefined) {
        return read(n, k);
    } else {
    const result = k > n 
                   ? 0
                   : k === 0 || k === n ? 1
                   : mchoose(n - 1, k) + mchoose(n - 1, k - 1);
    write(n, k, result);
    return result;
    }
}

// 