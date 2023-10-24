function rotate_matrix(M) {
    const m = array_length(M); 
    if (m === 0) {
        return M;
    } else {
        const n = array_length(M[0]); 
        // transpose
        for (let i = m - 1; i >= 0; i = i - 1) {
            for (let j = 0; j < i; j = j + 1) {
                const temp = M[i][j];
                M[i][j] = M[j][i]; 
                M[j][i] = temp;
            }
        }
        // swap
        for (let i = 0; i < m; i = i + 1) {
            for (let j = 0; j < n / 2; j = j + 1) {
                const temp = M[i][j];
                M[i][j] = M[i][n - j - 1]; 
                M[i][n - j - 1] = temp;
            }
        }
    }
    return M;
}
const matrix = [[1,2,3,4],
                [5,6,7,8],
                [9,10,11,12],
                [13,14,15,16]];
rotate_matrix(matrix);

// not really working
function rotate_matrix_2(M) {
    const m = array_length(M);
    if (m === 0) {
        return M;
    } else {
        const n = array_length(M[0]);
        const half = math_ceil(n / 2);
        for (let i = 0; i < half; i = i + 1) {
            for (let j = 0; j < half; j = j + 1) {
                let top_left = M[i][j]; 
                let top_right = M[i][n - j];
                let bottom_right = M[n - i][n - j];
                let bottom_left = M[n - i][j];
                
                M[i][j] = top_right;
                M[i][n - j] = bottom_right;
                M[n - i][n - j] = bottom_left;
                M[n - i][j] = top_left;
            }
        }
    }
    return M;
}
rotate_matrix_2(matrix);