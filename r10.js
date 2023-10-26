// q2
function zip_list_of_streams(ss) {
    return pair(head(head(ss)), 
                () => zip_list_of_streams(
                            append(tail(ss), 
                                   list(stream_tail(s)))));
}

// q3
function partial_sum(s) {
    return pair(head(s), 
                () => add_stream(stream_tail(s), 
                                 partial_sum(s))); 
}

const integers = integers_from(1); 

eval_stream(partial_sum(integers), 10);