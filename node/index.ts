import { Service } from "@vtex/api";


import Query from "./graphql/Queries/Resolver";

export default new Service({
	graphql: {
		resolvers: {
			Query
		}
	},
	routes: {
		robots: async ctx => {
			const { response: res } = ctx;
			res.set("Content-Type", "text/plain");
			res.body = "User-agent:*\nDisallow:/";

			return (res.status = 200);
		}
	}
});
