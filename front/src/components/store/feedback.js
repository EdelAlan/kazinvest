import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    feedback: [],
  }),

  mutations: {
    set_feedback(state, feedback) {
      state.feedback = feedback;
    },
  },

  getters: {
    feedback: state => state.feedback,
  },

  actions: {
    set_feedback ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/feedback'
      }).then(feedback => commit('set_feedback', feedback));
    },

    send_feedback (_, {
        email,
        message,
        file,
        member_id,
    }) {
      return fetcher({
        method: 'post',
        path: this.getters.api_path + '/back/api/feedback',
        body: {
            email,
            message,
            file,
            member_id,
        },
      }).then( ({ msg }) => {
        return msg;
      });
    },

    send_feedback_answer (_, selected_feedback) {
      return fetcher({
        method: 'post',
        path: this.getters.api_path + '/back/api/feedback/answer',
        body: {
            ...selected_feedback
        },
      }).then( ({ msg }) => {
        if (msg == 'feedback answered') {
          this.dispatch('set_feedback');
          this.dispatch('change_ui_visibility', {
            ui_component: 'image_modal',
            ui_component_state: false,
          });
        }
      });
    },

  },
};