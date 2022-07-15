export function login(req, res, next) {
	try {
		res.sendStatus(200);
	} catch (error) {
		res.status(500).send("Erro no servidor");
	}
}

export function signup(req, res, next) {
	try {
		res.sendStatus(201);
	} catch (error) {
		res.status(500).send("Erro no servidor");
	}
}
