const handleUnauthorized = (error, res) => {

	res.status(400).send({
		msg: "Unauthorized!",
	});
};

export default handleUnauthorized;
