export const state = () => ({
    head: {},
    isMobile: false
});
export const mutations = {
    isMobile(state, isMobile) {
        state.isMobile = isMobile;
    }
}

export const getters = {
    isMobile: (state) => {
        if (process.browser) {
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            if (width < 990)
                return true;
            else
                return false;
        }
        else return state.isMobile;
    }
}
export const actions = {
    async nuxtServerInit({ commit }, { req }) {
        var MobileDetect = require('mobile-detect'),
            md = new MobileDetect(req.headers['user-agent']);
        var isMobile = false;
        if (md.mobile())
            isMobile = true;
        await commit('isMobile', isMobile)

    }
}
