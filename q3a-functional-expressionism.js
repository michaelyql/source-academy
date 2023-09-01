// My amended answer to Quest 3A, Question 5
// It correctly returns zero_repeater for the special input cases
// zero_repeater and one_repeater

const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, () => zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, () => one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, () => two_repeater(f)(x));

const to_int = repeater => repeater((iter_count, x) => x() + 1)(0);

const decrement_repeater = repeater => {
    if (!is_function(repeater((iter_count, x) => x)(0))) {
        return zero_repeater;
    }
    else {
        const one_lower = (repeater((iter_count, x) => iter_count)(0))
                                ((iter_count, x) => iter_count)(0);
        return is_function(one_lower) 
            ? f => x => f(one_lower, () => one_lower(f)(x)) 
            : zero_repeater;
    }
};

display(decrement_repeater(one_repeater));
display(decrement_repeater(zero_repeater));
display(decrement_repeater(two_repeater));