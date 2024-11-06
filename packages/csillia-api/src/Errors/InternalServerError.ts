const handleInternalServerError = (error, res) => {
    console.log(error);
    res.status(500).send({
        msg: "Internal server error",
    });
};

export default handleInternalServerError;
