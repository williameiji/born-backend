export function newStudent(req, res, next) {
	try {
		res.status(201).send("Cadastro efetuado com sucesso");
	} catch (error) {
		res.sendStatus(500);
	}
}

export function findStudent(req, res, next) {
	try {
		const data = res.locals.data;
		res.set("Access-Control-Allow-Origin", "https://born-frontend.vercel.app");
		res.send(data);
	} catch (error) {
		res.sendStatus(500);
	}
}

export function editStudent(req, res, next) {
	try {
		res.status(200).send("Dados editados com sucesso!");
	} catch (error) {
		res.sendStatus(500);
	}
}
