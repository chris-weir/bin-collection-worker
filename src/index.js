import bin from "./bin"
export default {
	async fetch(request, env, ctx) {
		const data = await bin.getData()
		return Response.json(data)
	},
};
