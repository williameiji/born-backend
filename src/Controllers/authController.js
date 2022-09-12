export function login(req, res, next) {
	try {
		const token = res.locals.token;
		res.set("Access-Control-Allow-Origin", "https://born-frontend.vercel.app");
		res.status(200).send(token);
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
