let asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if ((typeof a === "number") && (typeof b === "number"))
                resolve(a + b);
            else
                reject("Arguments must be numbers");
        }, 1500);
    });
};

asyncAdd(5, "23").then((res) => {
    console.log(`Result: ${res}`);
    return asyncAdd(res, 1);
}).then((res) => {
    console.log(`Result 2: ${res}`);
}).catch((error) => {
    console.log(error)
});

// let somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("It worked!");
//         resolve("It worked?");
//         reject("Didn't work :(")
//     }, 2500);
// });

// somePromise.then((message) => {
//     console.log(message);
// }, (error) => {
//     console.log(error);
// });