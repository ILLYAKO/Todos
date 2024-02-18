// const intersections = (arr1, arr2, arr3) => {
//     return arr1.filter((item) => arr2.includes(item) && arr3.includes(item));
// };

// // Example usage
// const arr1 = [1, 2, 3, 4, 5, 6];
// const arr2 = [2, 4, 6, 8, 10];
// const arr3 = [1, 4, 6, 7, 10];

// console.log(intersections(arr1, arr2, arr3)); // Output: [4, 6]

function intersections(arr1, arr2, arr3) {
    const results = [];
    let i = 0, j = 0, x = 0;

    while (i < arr1.length && j < arr2.length && x < arr3.length) {
        if (arr1[i] === arr2[j] && arr2[j] === arr3[x]) {
            results.push(arr1[i]);
            i++;
            j++;
            x++;
        } else if (arr1[i] < arr2[j]) {
            i++;
        } else if (arr2[j] < arr3[x]) {
            j++;
        } else {
            x++;
        }
    }
    return results;
}

// Example usage:
const arr1 = [1, 2, 3, 4, 5, 6];
const arr2 = [2, 4, 6, 8, 10];
const arr3 = [1, 4, 6, 7, 10];

const result = intersections(arr1, arr2, arr3);
console.log(result); // Output: [4, 6]
