import { ScullyConfig } from '@scullyio/scully';
import './scully/plugins/articlePostPlugin';

/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer'

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "blog-app",
  // add spsModulePath when using de Scully Platform Server,
  outDir: './dist/static',
  
  routes: {
    '/p/:postSlug': {
      type: 'articlePostPlugin'
    }
  }
};