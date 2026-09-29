import { initRouter } from './modules/router.js';
import { initMenu } from './modules/menu.js';

if (window.dayjs && window.dayjs_plugin_relativeTime) {
  dayjs.extend(window.dayjs_plugin_relativeTime);
  dayjs.locale('pt-br');
}

initMenu();
initRouter();