function euclid(a, b) {
    let max = a > b ? a : b;
    let min = a < b ? a : b;

    while (max % min != 0) {
        [max, min] = [min, max % min];
    }

    return min;
}

function rsa(a, b) {
    let N = a * b;
    let P = (a - 1n) * (b - 1n)

    let e = 2n;
    while ((e < P) && (euclid(e, P) != 1n)) {
        ++e;
    }

    let d = 2n;
    while ((d * e) % P != 1n) {
        ++d;
    }

    return [e, d, N];
}