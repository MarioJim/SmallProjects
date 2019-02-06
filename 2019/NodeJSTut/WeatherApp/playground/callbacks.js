const getUser = (id, callback) => {
    const user = {
        id,
        name: "oh shit",
    };

    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(3434, user => console.log(user));
