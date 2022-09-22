/**
 * Middleware pro kontrolu a nastavi pages, do kterych ma uzivatel opravneni vstoupit
 *
 * @export
 * @param {*} to
 * @param {*} from
 * @returns {*}
 */
export default async function (to, from) {
	let result: any = true;
	if (useState('isClient')?.value) {
		setRoutes();
		try {
			await useNuxtApp()
				.$kc?.init({
					onLoad: 'check-sso',
					silentCheckSsoRedirectUri: window?.location?.origin + '/silent-check-sso.html',
					checkLoginIframe: false,
					refreshToken: useCookie('x-ref-token').value,
					token: useCookie('x-acc-token').value,
				})
				.then((auth) => (result = to.path.indexOf('pz') >= 0 && !auth ? navigateTo('/login') : true))
				.catch(() => (result = to.path.indexOf('pz') >= 0 ? navigateTo('/login') : true));
		} catch (error) {
			console.log(error);
		}
	}
	return result;
}

function setRoutes() {
	const routes = useRouter().getRoutes();
	routes.forEach((route: any) => {
		route.children = routes
			.filter(
				(child: any) =>
					child.name !== 'index' &&
					child !== route &&
					child.meta.visible !== false &&
					child.name !== `${route.name}-id` &&
					child.name.indexOf(route.name) >= 0
			)
			.sort((a: any, b: any) => (a.meta.pos || 0) - (b.meta.pos || 0));
		const parent = routes.find(
			(parent: any) =>
				parent.name !== 'index' &&
				parent !== route &&
				parent.meta.visible !== false &&
				route.name !== `${parent.name}-id` &&
				route.name.indexOf(parent.name) >= 0
		);
		if (parent) {
			route.meta.parentName = parent.name;
		}
	});
	setStore(
		'routes',
		routes
			.filter((route) => !route.meta.parentName && route.meta.visible !== false)
			.sort((a: any, b: any) => (a.meta.pos || 0) - (b.meta.pos || 0))
	);
}
