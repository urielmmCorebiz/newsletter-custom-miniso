import axios from 'axios';
import { GraphQLExtensionError } from '../../exceptions/GraphQLExtensionError';
// tslint:disable-next-line:variable-name
const horaAtualServidor = async (_obj: any, _args: any, ctx: any, _info: any) => {
	const http = axios.create({
		headers: {
			'Content-Type': 'application/json',
			'Proxy-Authorization': ctx.vtex.authToken
		}
	});
	try {
		const { data } = await http.get(`http://${ctx.header["x-vtex-account"]}.vtexcommercestable.com.br/no-cache/HoraAtualServidor.aspx`)
		let monthBr = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
		let time = data.match(/([0-9]+):([0-5][0-9]):([0-5][0-9])/)[0];
		let day = parseInt(data.match(/[a-z]{3} ([0-9]{1,2})/)[1]);
		let month = monthBr.indexOf(data.match(/[a-z]{3}/)[0]) + 1;
		let year = parseInt(data.match(/[0-9]{4}/)[0]);
		let dayString = day.toString();
		let monthString = month.toString();
		if (day < 10) {
			dayString = "0" + day;
		}
		if (month < 10) {
			monthString = "0" + month;
		}
		return year + "/" + monthString + "/" + dayString + " " + time;
	} catch (err) {
		if (err.response) {
			const { statusText, status, data } = err.response as any;
			throw new GraphQLExtensionError(statusText, status, data);
		}
		throw err;
	}
};
export {
	horaAtualServidor
};
