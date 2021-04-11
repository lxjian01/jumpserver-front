const state = {
  current_menu:"",
  network_state:true,
};

const mutations = {
  setNetworkState(state, value) {
    state.network_state = value;
  },
  setCurrentMenu(state,current_menu) {
    state.current_menu = current_menu;
  },
};

const getters = {
  getNetworkState: state => {
    return state.network_state;
  },
  getCurrentMenu: state => {
    return state.current_menu;
  },
};

const action = {

};

export default {
  state,
  getters,
  mutations,
  action,
};

