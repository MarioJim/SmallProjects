let getUser = (id, callback) => {
    let user = {
        id: id,
        name: "oh shit"
    };

    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(3434, (user) => {
    console.log(user);
});