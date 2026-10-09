import { i as __toESM } from "../_runtime.mjs";
import { _ as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as getPhoto } from "./router-CMQznpBx2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-photo-CnqYJ6YN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** Loads a specimen photo from IndexedDB (client only). */
function usePhoto(specimenId, hasPhoto) {
	const [url, setUrl] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		let live = true;
		if (!specimenId || !hasPhoto) {
			setUrl(void 0);
			return;
		}
		getPhoto(specimenId).then((v) => {
			if (live) setUrl(v);
		}).catch(() => {
			if (live) setUrl(void 0);
		});
		return () => {
			live = false;
		};
	}, [specimenId, hasPhoto]);
	return url;
}
//#endregion
export { usePhoto as t };
