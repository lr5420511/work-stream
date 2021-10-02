import Vue from 'vue';
import Vuex from 'vuex';

import ModuleScene from './modules/module-scene';
import ModuleUser from './modules/module-user';
// import more modules to here!

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        'mod_scene': ModuleScene,
        'mod_user': ModuleUser
    }
});