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
	return true;
}
