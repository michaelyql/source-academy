// function remove_duplicates(lst) {
//     return accumulate(
//               (x, acc) => is_null(member(x, acc)) ? pair(x, acc) : acc, 
//               null, 
//               lst);
// }
// remove_duplicates(list(1, 2, 3, 4, 4, 3, 2, 1, 2));

// function subsets(xs) {
//     if (is_null(xs)) {
//         return list(null);
//     } 
//     else {
//         const combi_A = subsets(tail(xs));
//         const combi_B = map(lst => append(list(head(xs)), lst), combi_A);
//         return append(combi_A, combi_B); 
//     }
// }
// display_list(subsets(list(1, 2, 3)));

function permutations(s) {
    if (is_null(s)) {
        return list(null);
    }
    else {
        const contains_curr = pair(head(s), permutations(tail(s))); 
        if (is_null(tail(s))) {
            
        } else {
            const shift_curr = pair(head(tail(s)), 
                                permutations(append(head(s), 
                                                    tail(tail(s)))));   
        }
        return append(contains_curr, shift_curr);
    }
}
permutations(list(1, 2, 3));

