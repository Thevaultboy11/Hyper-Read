const handleInvalidCredentials = (res) => {
    res.status(400).send({
        msg: "Invalid username or password",
    });
};

export default handleInvalidCredentials;
