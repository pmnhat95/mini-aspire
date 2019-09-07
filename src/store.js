import Vue from 'vue'
import Vuex from 'vuex'
import modules from './store/modules';
import VueLogger from 'vuejs-logger';

const isProduction = process.env.NODE_ENV === 'production';

const options = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};

Vue.use(VueLogger, options);
Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  strict: !isProduction
});
