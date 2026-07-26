export class AppError extends Error {
	public readonly code: string;

	constructor(code: string, message: string) {
		super(message);
		this.code = code;
		
		// Restaura a cadeia de protótipos (essencial ao estender classes nativas em TypeScript)
		Object.setPrototypeOf(this, new.target.prototype);
		
		// Captura o stack trace para facilitar o seu debugging no terminal
		Error.captureStackTrace(this, this.constructor);
	}
}
