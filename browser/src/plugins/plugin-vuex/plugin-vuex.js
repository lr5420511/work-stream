import Vue from 'vue';
import Vuex from 'vuex';

import ModuleUser from './modules/module-user';
import ModuleSettings from './modules/module-settings';
import ModuleOperate from './modules/module-operate';
// import more modules to here!

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        'mod_user': ModuleUser,
        'mod_settings': ModuleSettings,
        'mod_operate': ModuleOperate
    }
});