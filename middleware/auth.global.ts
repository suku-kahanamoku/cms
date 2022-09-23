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
	setRoutes();
	try {
		const kc = useNuxtApp().$kc;
		const accTokenCookie = useCookie('x-acc-token');
		const refTokenCookie = useCookie('x-ref-token');
		await kc
			?.init({
				onLoad: 'check-sso',
				silentCheckSsoRedirectUri: window?.location?.origin + '/silent-check-sso.html',
				checkLoginIframe: false,
				refreshToken: refTokenCookie.value,
				token: accTokenCookie.value,
			})
			.then((auth) => {
				// pokud je prihlaseny muze vstoupit
				if (auth) {
					accTokenCookie.value = kc.token;
					useState('redirect').value = null;
				}
				// pokud neni prihlaseny a je to zabezpecena stranka, presmeruje na login
				else if (to.path.indexOf('pz') >= 0) {
					accTokenCookie.value = null;
					refTokenCookie.value = null;
					result = navigateTo('/login');
					setStore('redirect', to.path);
					useToast({ type: 'error', message: 'message.permission_error' });
				}
			})
			.catch(() => {
				if (to.path.indexOf('pz') >= 0) {
					accTokenCookie.value = null;
					refTokenCookie.value = null;
					result = navigateTo('/login');
					setStore('redirect', to.path);
					useToast({ type: 'error', message: 'message.permission_error' });
				}
			});
	} catch (error) {
		console.log(error);
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
