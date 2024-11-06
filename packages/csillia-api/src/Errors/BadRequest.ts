const handleBadRequest = (res) => {
    res.status(400).send({
        msg: "Bad request",
    });
};

export default handleBadRequest;
