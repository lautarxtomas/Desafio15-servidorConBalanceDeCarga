process.on('message', msg => {
	const { cantidad, obj } = msg;
	const result = randomNum(cantidad, obj);
	process.send(result);
});

const randomNum = (cantidad, obj) => {
	for (let i = 0; i < cantidad; i++) {
		const random = Math.floor(Math.random() * 10);
		if (obj[random]) {
			obj[random]++;
			continue;
		}
		obj[random] = 1;
	}
	return obj;
};
