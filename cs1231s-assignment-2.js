function permutate(xs, n) {
    if (n === 1) {
        return map(x => list(x),
                   xs);
    } else {
        return accumulate(append, 
                          null, 
                          map(x => map(p => pair(x, p),
                                       permutate(xs, n - 1)),
                               xs));
    }
}
let perms = permutate(list("a", "b", "c"), 4);

function containsConsecutive(xs) {
    for (let ptr = xs; !is_null(tail(ptr)); ptr = tail(ptr)) {
        if (head(ptr) === head(tail(ptr))) {
            return true;
        }
    }
    return false;
}

const noConsec = filter(perm => !containsConsecutive(perm), perms);

// ys subset of ys
function subsetOf(xs, ys) {
    for (let ptr = xs; length(ptr) >= 3; ptr = tail(ptr)) {
        if (head(ptr) === head(ys)
            && head(tail(ptr)) === head(tail(ys))
            && head(tail(tail(ptr))) === head(tail(tail(ys)))) {
                return true;
            }
    }
    return false;
}

const noCABnoBAC = filter(perm => !subsetOf(perm, list("c", "a", "b")) 
                                  && !subsetOf(perm, list("b", "a", "c")), perms);

const noCABnoBACAndNoConsec = filter(perm => !containsConsecutive(perm)
                                           && !subsetOf(perm, list("c", "a", "b"))
                                           && !subsetOf(perm, list("b", "a", "c")),
                                   perms);
noCABnoBACAndNoConsec;


const x = length(noConsec);
const y = length(noCABnoBAC);
let z = length(noCABnoBACAndNoConsec);
x + y - z; // inclusion exclusion rule