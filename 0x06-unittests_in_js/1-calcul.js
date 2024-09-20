function calculateNumber(type, a, b) {
    // Round the numbers
    const roundedA = Math.round(a);
    const roundedB = Math.round(b);

    // Perform the operation based on the 'type' argument
    if (type === 'SUM') {
        return roundedA + roundedB;
    } else if (type === 'SUBTRACT') {
        return roundedA - roundedB;
    } else if (type === 'DIVIDE') {
        if (roundedB === 0) {
            return 'Error';
        }
        return roundedA / roundedB;
    } else {
        throw new Error('Invalid type');
    }
}

module.exports = calculateNumber;
