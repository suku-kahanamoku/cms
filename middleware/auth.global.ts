/**
 * Middleware pro kontrolu a nastavi pages, do kterych ma uzivatel opravneni vstoupit
 *
 * @export
 * @param {*} to
 * @param {*} from
 * @returns {*}
 */
export default async function (to, from) {
	if (useState('isClient')?.value) {
		// stahne vsechny pageConfigs, do kterych ma uzivatel pravo vstoupit
		return await $fetch('/api/page?tree=1')
			.then((data: any) => {
				const configs = data.result;
				const pageRoutes = getPageRoutes(configs);
				const pageConfig = getPageConfig(pageRoutes.routes, to.meta?.syscode);
				// nastavi globalni promene pages a routes
				setStore('pages', pageRoutes.pages);
				setStore('routes', pageRoutes.routes);
				// pokud existuje (ma opravneni) pageConfig, nastavi pageConfig a vrati true
				if (pageConfig) {
					setStore('pageConfig', pageConfig);
				} else {
					throw createError({ statusCode: 401, statusMessage: 'message.unauthorized' });
				}
				return true;
			})
			.catch((error): any => {
				return navigateTo((useState('pages') as any)?.login?.path);
			});
	}
	return true;
}

/**
 * Vybere pageConfig
 *
 * @param {any[]} configs
 * @param {string} syscode
 * @returns {*}
 */
function getPageConfig(configs: any[], syscode: string) {
	let pageConfig = configs?.find((config) => config.syscode === syscode);
	if (!pageConfig) {
		for (const config of configs) {
			if (config.children?.length) {
				const tmpConfig = getPageConfig(config.children, syscode);
				if (tmpConfig) {
					pageConfig = tmpConfig;
					break;
				}
			}
		}
	}
	return pageConfig;
}

/**
 * Vrati vsechny routy, do kterych ma opravneni vstoupit
 *
 * @param {any[]} configs
 * @returns {*}
 */
function getPageRoutes(configs: any[]) {
	const routes = useRouter()
		.getRoutes()
		.filter((route: any) => getPageConfig(configs, route.meta?.syscode))
		.map((route: any) => {
			const pageConfig = getPageConfig(configs, route.meta?.syscode);
			pageConfig.path = route.path;
			return pageConfig;
		})
		.filter((route) => !route.parentId);

	const pages: any = {};
	routes.forEach((route) => {
		pages[route.syscode || route.name] = route;
	});
	return {
		routes: routes,
		pages: pages,
	};
}
