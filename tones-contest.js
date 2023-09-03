import { 
    adsr, cello, play, piano, simultaneously, violin, 
    consecutively, silence_sound, trombone, 
    noise_sound, bell, square_sound
} from 'sound';

// Viva la Vida by Coldplay (2008)
// 120 bpm, common time (4/4) 
// 30 bars per minute, 1 bar every 2 seconds
// 8 quavers per bar ==> each quaver takes 1 / 8 * 2 = 0.25s 
// G Major

// const snare_drum = consecutively(list(adsr(0.05, 0.95, 0, 0)(noise_sound(0.25)), 
//                                       silence_sound(0.25)));

const drum = (itv) => {
    return consecutively(list(adsr(0.05, 0.95, 0, 0)(square_sound(27.50, itv * 0.25)), 
                         silence_sound(itv * 0.25)));
};

function repeat(n, sound) {
    return n < 1
           ? list(sound) 
           : consecutively(list(sound, repeat(n - 1, sound)));
}

function chain(sound1, sound2) {
    return consecutively(list(sound1, sound2));
}

function layer(sound1, sound2) {
    return simultaneously(list(sound1, sound2));
} 

function join_after(delay, sound) {
    return consecutively(list(silence_sound(delay), sound));
}

function hook(instrument, note1, note2) {
    const qt1 = instrument(note1, 0.5);  
    const qv1 = instrument(note1, 0.25);
    const qt2 = instrument(note2, 0.5);
    const qv2 = instrument(note2, 0.25); 
    return consecutively(
               list(qt1, qt1, qt1, qv1, qt2, qt2, qv2, qt2, qt2));
}

function parse_notes(instrument, notes, intervals, delay) {
    if (length(notes) !== length(intervals)) {
        error("note and interval list length not the same, abort");
    } else {
        return join_after(delay, 
                          consecutively(
                              build_list(i => instrument(list_ref(notes, i), 
                                                         list_ref(intervals, i)), 
                                         length(notes))));
    }
}

function base_hook() {
    function bar1() {
        const v1 = hook(violin, 60, 62);
        const v2 = hook(violin, 69, 69);
        const c1 = hook(cello, 72, 72);
        const c2 = hook(cello, 67, 67);
        const c3 = hook(cello, 60, 62);
        const t1 = hook(trombone, 48, 50);
        return simultaneously(list(v1, v2, c1, c2, c3, t1));
    }
    function bar2() {
        const v1 = hook(violin, 62, 64);
        const v2 = hook(violin, 69, 69);
        const c1 = hook(cello, 72, 72);
        const c2 = hook(cello, 67, 67);
        const c3 = hook(cello, 59, 59);
        const t1 = hook(trombone, 55, 52);
        return simultaneously(list(v1, v2, c1, c2, c3, t1));
    }
    return repeat(3, repeat(4, chain(bar1(), bar2())));
}

function stanza1() { 
    const notes = list(83, 83, 83, 83, 84, 81, 81, 81, 81, 81, 79, 83, 74, 76,
                       83, 83, 83, 83, 83, 83, 83, 84, 81, 81, 81, 81, 81, 81,
                       83, 79, 78, 76);
    const intervals = map((i => i * 0.25), 
                          list(1, 2, 2, 6, 1, 6, 2, 1, 2, 1, 1, 2, 1, 2,
                               1, 1, 1, 1, 1, 2, 6, 1, 6, 2, 1, 2, 2, 2, 
                               1, 2, 1, 6));
    const verse1 = parse_notes(violin, notes, intervals, 14.75);
    return verse1;   
} 

//D5  E5  F#5  G5  A5  B5  C6
//74  76  78   79  81  83  84

function stanza2() {
    const c1 = () => {
        const p1 = repeat(4, parse_notes(cello, 
                                         list(67, 67, 66), 
                                         map((i => i * 0.25), list(6, 1, 9)),
                                         0));
        const p2 = parse_notes(cello, 
                               list(79, 78, 76, 74, 64, 62, 
                                    67, 66, 62, 59, 62, 59,
                                    67, 66, 64, 62, 64, 62, 
                                    67, 66, 62, 59, 62, 59
                                    ), 
                               map((i => i * 0.25), 
                                   list(1, 1, 1, 1, 8, 4, 
                                        1, 1, 1, 1, 7, 5, 
                                        1, 1, 1, 1, 8, 4, 
                                        1, 1, 1, 1, 7, 9)), 
                               15);
        return layer(p1, p2);
    };
    const v1 = () => {
        const p1 = repeat(2, parse_notes(violin,
                                         list(79, 79, 78),
                                         map((i => i * 0.25), list(6, 1, 9)),
                                         0));
        const p2 = repeat(2, parse_notes(violin, 
                                         list(67, 66, 64, 62, 64, 62, 
                                              67, 66, 62, 59, 62, 59),
                                         map((i => i * 0.25), 
                                              list(1, 1, 1, 1, 8, 4, 
                                                   1, 1, 1, 1, 7, 5)), 
                                         0));
        return layer(join_after(8, p1), join_after(15, p2));
    };
    const verse2 = () => {
        const n = list(83, 83, 83, 83, 84, 81, 81, 81, 
                       81, 81, 79, 81, 81, 83, 79, 78, 76,
                       83, 83, 83, 83, 83, 84, 81, 79, 79, 
                       83, 81, 79, 79, 83, 81, 79, 79, 
                       88, 88, 88, 88);
        const i = map((i => i * 0.25), 
                      list(1, 2, 2, 6, 1, 6, 2, 1, 
                           2, 1, 1, 1, 1, 1, 1, 1, 3,
                           1, 1, 1, 1, 5, 2, 7, 1, 1, 
                           1, 1, 1, 3, 1, 1, 1, 2, 
                           1, 1, 1, 2));
        return parse_notes(violin, n, i, 14.75);
    };
    const drums = join_after(16, repeat(96, drum(1)));
    return layer(drums, layer(verse2(), layer(c1(), v1())));
}

function stanza3() {
    const c1v1 = () => {
        const n = list(67, 69, 67, 69, 67, 69, 67,
                       69, 71, 69, 71, 69, 
                       67, 66, 64, 62, 64, 62, 
                       67, 66, 62, 59, 62, 64
                       );
        const i = map((i => i * 0.25), 
                      list(2, 1, 3, 1, 3, 1, 4, 
                           2, 1, 3, 1, 5,
                           1, 1, 1, 1, 8, 4, 
                           1, 1, 1, 1, 7, 7));
        return layer(parse_notes(cello, n, i, 0), parse_notes(violin, n, i, 0)); 
    };
    const verse3 = () => {
    };
    play(c1v1());
    return 0;
}

stanza3();

const song = layer(base_hook(), chain(stanza1(), stanza2()));

const fade_in_out = adsr(0.1, 0.4, 0.8, 0.1);

// play(fade_in_out(song)); 

 
