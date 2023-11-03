// Task 1A
function insert_subseq(L, pos, S) {
    if (pos === 0) {
        return append(S, L);
    } else {
        return pair(head(L), insert_subseq(tail(L), pos - 1, S));
    }
}

display("       ---------- Task 1A ----------       ");
display(insert_subseq( list(10, 11, 12), 0, list(55, 66) ));
display(insert_subseq( list(10, 11, 12), 2, list(55, 66) ));
// returns list(10, 11, 55, 66, 12)
display(insert_subseq( list(10, 11, 12), 3, list(55, 66) ));
// returns list(10, 11, 12, 55, 66)
display(insert_subseq( list(10, 11, 12), 1, null ));
// returns list(10, 11, 12)
display(insert_subseq( null, 0, list(55, 66) ));
// returns list(55, 66)
display(insert_subseq( null, 0, null ));
// returns null


// Task 1B
function remove_subseq(L, start_pos, end_pos) {
    if (start_pos === 0) {
        if (start_pos === end_pos) {
            return tail(L);
        } else {
            return remove_subseq(tail(L), start_pos, end_pos - 1);
        }
    } else {
        return pair(head(L), remove_subseq(tail(L), 
                                           start_pos - 1,
                                           end_pos - 1));
    }
}
display("       ---------- Task 1B ----------       ");
display_list(remove_subseq( list(10, 11, 12, 13, 14, 15, 16), 2, 4 ));
// returns list(10, 11, 15, 16)
display_list(remove_subseq( list(14, 11, 12, 13, 14, 15, 16), 3, 5 ));
// returns list(14, 11, 12, 16)
display_list(remove_subseq( list(10, 11, 12, 13, 14, 15, 16), 0, 0 ));
// returns list(11, 12, 13, 14, 15, 16)
display_list(remove_subseq( list(13, 11, 12, 13, 14, 15, 16), 3, 3 ));
// returns list(13, 11, 12, 14, 15, 16)
display_list(remove_subseq( list(10, 16, 12, 13, 14, 15, 16), 6, 6 ));
// returns list(10, 16, 12, 13, 14, 15)
display_list(remove_subseq( list(10, 11, 12, 13, 14, 15, 16), 0, 2 ));
// returns list(13, 14, 15, 16)
display_list(remove_subseq( list(10, 11, 12, 13, 14, 15, 16), 4, 6 ));
// returns list(10, 11, 12, 13)
display_list(remove_subseq( list(10, 11, 12, 13, 14, 15, 16), 0, 6 ));
// returns null
display_list(remove_subseq( list(10), 0, 0 ));
// returns null

// Task 2A
function is_prefix_of(subseq, seq) {
    if (length(subseq) > length(seq)) {
        return false;
    } else if (is_null(subseq)) {
        return true;
    } else {
        return head(subseq) === head(seq) && is_prefix_of(tail(subseq),
                                                          tail(seq));
    }
}
display("       ---------- Task 2A ----------       ");
display(is_prefix_of(list("a", "b", "c"),list("a", "b", "c", "d", "e")));
display(is_prefix_of(list("b", "c"),list("a", "b", "c", "d", "e")));
display(is_prefix_of(list("a", "b", "c"), list("a", "b", "c")));
display(is_prefix_of(list("a", "b", "c"), list("a", "b")));
display(is_prefix_of(list(), list("a", "b", "c")));
display(is_prefix_of(list(), list()));

// Task 2B
function tail_n_times(xs, n) {
    return is_null(xs)
           ? null
           : n <= 0
           ? xs
           : tail_n_times(tail(xs), n - 1);
}

function subseq_replace(new_sub, old_sub, seq) {
    if (is_null(seq)) {
        return null;
    } else {
        const old_sub_len = length(old_sub);
        if (old_sub_len > length(seq)) {
            return seq;
        } else {
            let match = true;
            for (let i = 0; i < old_sub_len; i = i + 1) {
                if (head(tail_n_times(old_sub, i)) !== head(tail_n_times(seq, i))) {
                    match = false;
                    break;  
                }
            }   
            if (match) {
                return append(new_sub, 
                              subseq_replace(new_sub,
                                             old_sub,
                                             tail_n_times(seq, old_sub_len)));
            } else {
                return pair(head(seq),
                            subseq_replace(new_sub, old_sub, tail(seq)));
            }
        }
    }
}

display("       ---------- Task 2B ----------       ");
display_list(subseq_replace(list("x"), 
                            list("a", "b", "a"),
                            list("a", "b", "a", "b", "a", "b", "a")));
// returns list("x", "b", "x"))
display_list(subseq_replace(list("x", "y", "z"), 
                            list("a", "b"),
                            list("a", "b", "c", "d", "e", "a", "b")));
// returns list("x", "y", "z", "c", "d", "e", "x", "y", "z")
display_list(subseq_replace(list("x", "y"), 
                            list("p", "q", "r"),
                            list("a", "b", "a", "b", "a", "b", "a")));
// returns list("a", "b", "a", "b", "a", "b", "a")

// Task 3A
function make_NiFT(T) {
    if (is_null(T)) {
        return null;
    } else {
        const numbers = filter(is_number, T);
        const lists = filter(is_list, T); 
        const nifts = reverse(map(x => make_NiFT(x),
                              lists));
        return accumulate((x, acc) => append(acc, list(x)), 
                          numbers,
                          nifts);
    }
}
display("       ---------- Task 3A ----------       ");
const tree1 = list( list(4,4,1), 5, 2, list(8,9), 4, list(6,7), 3 );
display_list(make_NiFT(tree1));
// returns list( 5, 2, 4, 3, list(4,4,1), list(8,9), list(6,7) )
const tree2 = list( list(1, 2, list(3, 4), 5), 6, null, list(7), 8, 9,
list( list(10), 11, list(12, 13, list(14, 15)) ) );
display_list(make_NiFT(tree2));
// returns list( 6, 8, 9, list(1, 2, 5, list(3, 4)), null, list(7),
// list( 11, list(10), list(12, 13, list(14, 15)) ) )


// Task 3B
function insert(x, xs) {
    return is_null(xs)
           ? list(x)
           : x <= head(xs)
           ? pair(x, xs)
           : pair(head(xs), insert(x, tail(xs)));
}
function insertion_sort(xs) {
    return is_null(xs)
           ? xs
           : insert(head(xs), insertion_sort(tail(xs)));
}
function map_tree(fun, tree) {
    return map(sub_tree =>
                    !is_list(sub_tree)
                    ? fun(sub_tree)
                    : map_tree(fun, sub_tree),
               tree);
}
function make_SToN(T) {
    
}