
/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function(expression) {
    const memo = {};

    function compute(expr) {
        if (memo[expr] !== undefined) {
            return memo[expr];
        }
        
        const results = [];
        // Loop through the expression and divide at every operator
        for (let i = 0; i < expr.length; i++) {
            const char = expr[i];
            if (char === '+' || char === '-' || char === '*') {
                // Split into left and right parts based on the operator
                const leftPart = compute(expr.slice(0, i));
                const rightPart = compute(expr.slice(i + 1));
                
                // Combine the results from left and right using the current operator
                for (const left of leftPart) {
                    for (const right of rightPart) {
                        if (char === '+') {
                            results.push(left + right);
                        } else if (char === '-') {
                            results.push(left - right);
                        } else if (char === '*') {
                            results.push(left * right);
                        }
                    }
                }
            }
        }

        // If the expression is just a number, return it as a result
        if (results.length === 0) {
            results.push(parseInt(expr));
        }

        memo[expr] = results;
        return results;
    }

    return compute(expression);
};
