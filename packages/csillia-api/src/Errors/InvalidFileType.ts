const handleInvalidFileType = (res) => {
    res.status(400).send({
        msg: "Filetypes other than PDF are not supported",
    });
};

export default handleInvalidFileType;
