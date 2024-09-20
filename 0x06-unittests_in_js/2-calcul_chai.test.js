(async function() {
    const chai = await import('chai');
    const expect = chai.expect;
    const calculateNumber = require('./2-calcul_chai.js');

    describe('calculateNumber', function() {
        it('should return sum of rounded numbers for SUM type', function() {
            expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
        });

        it('should return subtraction of rounded numbers for SUBTRACT type', function() {
            expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
        });

        it('should return division of rounded numbers for DIVIDE type', function() {
            expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
        });

        it('should return Error if dividing by zero', function() {
            expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
        });
    });
})();
