const handleNotFound = (res) => {
	res.status(404).send({
		msg: "Not found!",
	});
};

export default handleNotFound;
