function append_to_array(x, arr) {
    const l = array_length(arr);
    arr[l] = x; 
}

// Array version
function count_pairs(x, counted) {
    let is_counted = false;
    for (let i = 0; i < array_length(counted); i = i + 1) {
        if (x === counted[i]) {
            is_counted = true;
        }
    }
    if (!is_counted) {
        if (!is_pair(x)) {
            return 0;
        } else {
            append_to_array(x, counted); 
            return 1 + count_pairs(head(x), counted) + count_pairs(tail(x), counted);
        }
    } else {
        return 0;
    }
}

const y = pair(4, null);
const double_counted = pair(pair(3,y), pair(7, y));

const cycle = list(1,2,3);
set_tail(tail(tail(cycle)), cycle); 

display(count_pairs(cycle, []));
display(count_pairs(double_counted, []));

// List version

function count_pairs_using_list(x) {
    let lst = list();
    function helper(x) {
        if (is_null(member(x, lst))) {
            if (!is_pair(x)) {
                return 0;
            } else {
                lst = pair(x, lst); 
                return 1 + helper(head(x)) + helper(tail(x)); 
            }
        } else {
            return 0;
        }
    }
    return helper(x);
}

display(count_pairs_using_list(double_counted));
display(count_pairs_using_list(cycle)); 
