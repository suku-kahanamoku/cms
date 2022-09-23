export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		const password = body.password;
		return {
			result: {},
			msgs: [{ type: 'success', message: 'message.success_login' }],
		};
	} catch (error) {
		return error;
	}
});
