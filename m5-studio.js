function every_second(items) {
    return is_null(items) || is_null(tail(items)) 
        ? null 
        : pair(head(tail(items)), every_second(tail(tail(items)))); 
}

draw_data(every_second(list("a", "x", "b", "y", "c", "z", "d")));
draw_data(every_second(list("a", "x", "b", "y", "c", "z")));
draw_data(every_second(list("0")));
draw_data(every_second(null));

function sum(nums) {
    function sum_helper(ls) {
        return is_null(ls) 
            ? 0
            : head(ls) + sum_helper(tail(ls));
    }
    // function iter_helper(ls, currSum) {
    //     return is_null(ls)
    //         ? currSum
    //         : iter_helper(tail(ls), currSum + head(ls));
    // }
    return is_null(nums)
        ? null
        : list(head(nums) + sum_helper(every_second(tail(nums))), 
              sum_helper(every_second(nums)));
}

display(sum(list(1, 2, 3, 4, 5)));
display(sum(null));
