# Different-Ways-to-Add-Parentheses
Given a string expression of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. You may return the answer in any order.  The test cases are generated such that the output values fit in a 32-bit integer and the number of different results does not exceed 104.

Example 1:

Input: expression = "2-1-1"
Output: [0,2]
Explanation:
((2-1)-1) = 0 
(2-(1-1)) = 2
Example 2:

Input: expression = "2*3-4*5"
Output: [-34,-14,-10,-10,10]
Explanation:
(2*(3-(4*5))) = -34 
((2*3)-(4*5)) = -14 
((2*(3-4))*5) = -10 
(2*((3-4)*5)) = -10 
(((2*3)-4)*5) = 10



Solution:

This code defines a function `diffWaysToCompute` that takes an arithmetic expression string as input and returns all possible results by computing different ways to group numbers and operators in the expression.

### Let's break down the code step by step:

### Function Signature and Initialization:
```javascript
/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function(expression) {
    const memo = {};
```
- The function `diffWaysToCompute` accepts a single parameter `expression`, which is a string containing numbers and operators (`+`, `-`, and `*`).
- A `memo` object is initialized to store intermediate results for sub-expressions. This is used to speed up the computation by avoiding recalculating the same sub-expression multiple times (memoization).

### Helper Recursive Function (`compute`):
```javascript
    function compute(expr) {
        if (memo[expr] !== undefined) {
            return memo[expr];
        }
```
- The `compute` function is a recursive function that processes the expression `expr` and returns all possible results from grouping and evaluating the expression in different ways.
- If the result for a particular expression `expr` is already stored in `memo`, it returns the cached result directly (memoization).

### Looping through the Expression:
```javascript
        const results = [];
        for (let i = 0; i < expr.length; i++) {
            const char = expr[i];
            if (char === '+' || char === '-' || char === '*') {
```
- `results` is an array to store all possible results for the current sub-expression `expr`.
- The loop iterates through each character in the expression.
- Whenever it finds an operator (`+`, `-`, `*`), the expression is split into two parts: the part to the left of the operator and the part to the right of the operator.

### Recursive Division of Sub-expressions:
```javascript
                const leftPart = compute(expr.slice(0, i));
                const rightPart = compute(expr.slice(i + 1));
```
- For each operator, the function splits the expression into two sub-expressions:
    - `leftPart`: everything to the left of the current operator.
    - `rightPart`: everything to the right of the current operator.
- It then recursively computes all possible results for `leftPart` and `rightPart` using `compute`.

### Combining the Results:
```javascript
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
```
- Once the results from `leftPart` and `rightPart` are obtained, the function combines these results using the current operator.
- For each combination of results from `leftPart` and `rightPart`, the corresponding operation (`+`, `-`, or `*`) is applied, and the result is pushed into the `results` array.

### Handling Base Case (Single Number):
```javascript
        if (results.length === 0) {
            results.push(parseInt(expr));
        }
```
- If the loop does not find any operators, it means the expression is just a number (like `"5"`). In this case, the function converts the string to an integer using `parseInt` and pushes it to `results`.

### Storing Results in `memo`:
```javascript
        memo[expr] = results;
        return results;
    }
```
- After computing all possible results for the expression `expr`, it stores the result in `memo` to avoid recomputation later.
- Finally, the results are returned.

### Initial Call to the Helper Function:
```javascript
    return compute(expression);
};
```
- The `diffWaysToCompute` function calls the helper function `compute` with the full expression `expression`, which starts the recursive process.
- It returns the final result: an array of all possible values obtained by different ways of grouping and computing the expression.

### Example Walkthrough:

For `expression = "2-1-1"`, here’s how it works:
1. The `compute` function is called with `"2-1-1"`.
2. It splits the expression at the first `-`, resulting in:
    - Left part: `"2"`
    - Right part: `"1-1"`
3. It recursively computes results for `"1-1"`, which gives two possible results: `((1-1) = 0)` and `((1) = 1)`.
4. Then, it combines the left part (`2`) with the results from the right part:
    - `2 - 0 = 2`
    - `2 - 1 = 1`
5. It returns the final results: `[0, 2]`.

### Efficiency:
- **Memoization**: The `memo` object optimizes the process by storing results of previously computed sub-expressions, reducing redundant recursive calls.
- **Divide and Conquer**: The algorithm splits the problem into smaller sub-problems, solving each independently and combining results. This allows it to handle complex expressions efficiently.

This is how the code evaluates all possible ways to compute an expression by different groupings of numbers and operators.
