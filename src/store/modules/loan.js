import Vue from "vue";
import { ADD_TOAST_MESSAGE } from "vuex-toast";
import _ from "lodash";
import validate from "validate.js";

const types = {
  LOADING: "LOADING",
  SET_FIELD: "SET_FIELD",
  GET_LIST_SUCCESS: "GET_LIST_RE_PAYMENT_SUCCESS",
  GET_LIST_RE_PAYMENT_SUCCESS: "GET_LIST_SUCCESS",
  UPDATE_PAYMENT_SUCCESS: "UPDATE_PAYMENT_SUCCESS",
  UPDATE_PAYMENT_ERROR: "UPDATE_PAYMENT_ERROR",
  OPEN_PAYMENT_FORM: "OPEN_PAYMENT_FORM",
  RESET_FORM: 'RESET_FORM',
};

const constraints = {
  money: {
    presence: { allowEmpty: false },
    format: {
      pattern: "[0-9]+",
    },
    length: {
      maximum: 5
    }
  },
};

const getConstraints = () => {
    return constraints;
};

const getDefaultState = () => {
  return {
    form: {},
    search: {},
    products: [],
    page: 1,
    count: 0,
    total: 0,
    loading: false,
    paymentFormError: {},
  };
};

// initial state
const initialState = getDefaultState();

// getters
const getters = {
  form: state => state.form,
  search: state => state.search,
  list: state => state.list,
  listRePayment: state => state.listRePayment,
  totalRePayment: state => state.totalRePayment,
  count: state => state.count,
  page: state => state.page,
  total: state => state.total,
  loading: state => state.loading,
  paymentFormError: state => state.paymentFormError,
};

const validateForm = (form, keys) => {
  const fullConstraints = getConstraints();
  const validateConstraints = _.pickBy(fullConstraints, (value, key) => {
    if (keys.includes(key)) return true;
    return false;
  });

  const errors = validate(form, validateConstraints, {
    fullMessages: false
  });
  const newErrors = Object.keys(validateConstraints).reduce(
    (acc, key) => ({
      ...acc,
      [key]: errors ? errors[key] : null
    }),
    {}
  );
  return {
    success: errors ? false : true,
    errors: newErrors
  };
};

// actions
const actions = {
  validateField({ state, commit }, keys) {
    const { success, errors } = validateForm(
      state.form,
      keys
    );
    commit(types.UPDATE_PAYMENT_ERROR, errors);
    return success;
  },

  setField({ commit, dispatch }, { key, value }) {
    commit(types.SET_FIELD, { key, value });
    dispatch("validateField", [key]);
  },

  async getList({ dispatch, commit, state }) {
    commit(types.LOADING, true);
    commit(types.GET_LIST_SUCCESS);
  },

  async getListRePayment({ dispatch, commit, state }) {
    commit(types.LOADING, true);
    commit(types.GET_LIST_RE_PAYMENT_SUCCESS);
  },

  async updatePaymentForm({ dispatch, commit, state }) {
    try {
      const data = state.form;

      const itemSelected = state.listRePayment
         .filter(order => order.selected == true)
         .map(order => order);

       if (itemSelected.length == 0) {
         return dispatch(
           ADD_TOAST_MESSAGE,
           { text: "No order selected", type: "danger" },
           { root: true }
         );
       }

      commit(types.SET_FIELD, { key: 'loading', value: true });
      const success = await dispatch("validateField", 'money');

      if (success) {
        if (data.money < itemSelected[0].repayment) {
          dispatch(
            ADD_TOAST_MESSAGE,
            { text: 'The payment amount is less than the amount to be paid!', type: "danger" },
            { root: true }
          );
        } else if (data.money <= itemSelected[0].amount) {
          dispatch(
            ADD_TOAST_MESSAGE,
            { text: 'Update complete!', type: "success" },
            { root: true }
          );
          commit(types.RESET_FORM);
        }
      } else {
        commit(types.SET_FIELD, { key: 'loading', value: false });
      }

    } catch (e) {
      commit(types.SET_FIELD, { key: 'loading', value: false });
      dispatch(
        ADD_TOAST_MESSAGE,
        { text: "Update fail", type: "danger" },
        { root: true }
      );
    }
  },

  openPaymentForm({ state, commit }, loanId) {
    commit(types.OPEN_PAYMENT_FORM, loanId);
  },

  async submitAprroved({ state, dispatch, commit }, loanId) {
    try {
      const loanItem = this.list.rows
        .filter(item => item.id == loanId)
        .map(item => item);

      if (loanItem.length == 0) {
        return dispatch(
          ADD_TOAST_MESSAGE,
          { text: "This record no exists!", type: "danger" },
          { root: true }
        );
      }

      dispatch(
        ADD_TOAST_MESSAGE,
        { text: "Update successfully", type: "success" },
        { root: true }
      );
      commit(types.UPDATE_PAYMENT_SUCCESS, loanItem[0] );
    } catch (e) {
      Vue.$log.error("Update fail", e);
      dispatch(
        ADD_TOAST_MESSAGE,
        { text: "Update fail, please try again", type: "danger" },
        { root: true }
      );
    }
  },
};

// mutations
const mutations = {
  [types.SET_FIELD](state, params) {
    const newForm = { ...state.form, [params.key]: params.value };
    Vue.set(state, "form", newForm);
  },

  [types.LOADING](state, loading) {
    Vue.set(state, "loading", loading);
  },

  [types.GET_LIST_SUCCESS](state) {
    state.list = this.list.rows;
    state.total = this.list.total;
    state.loading = false;
  },

  [types.GET_LIST_RE_PAYMENT_SUCCESS](state) {
    state.listRePayment = this.listRePayment.rows;
    state.totalRePayment = this.listRePayment.total;
    state.loading = false;
  },

  [types.OPEN_PAYMENT_FORM](state, loanId ) {
    Vue.set(state.form, "money");
    Vue.set(state.form, "show", true);

    const newList = state.listRePayment.map(item => {
      if (item.id === loanId) {
        return {
          ...item,
          selected: true
        };
      } else {
        return {
          ...item,
          selected: false
        };
      }
    });
    Vue.set(state, "listRePayment", newList);
  },

  [types.UPDATE_PAYMENT_SUCCESS](state, loanItem) {
    const newList = this.list.rows.map(item => {
      if (item.id === loanItem.id) {
        loanItem.approved = true;
        return loanItem;
      } else {
        return item;
      }
    });

    Vue.set(state, "list.rows", newList);

    const newListRepayment = this.list.rows.filter(item => {
      if (item.approved) {
        return item;
      }
    });
    this.listRePayment.rows = newListRepayment;
  },

  [types.UPDATE_PAYMENT_ERROR](state, errors) {
    Vue.set(state, "paymentFormError", {
      ...state.paymentFormError,
      ...errors
    });
  },

  [types.RESET_FORM](state) {
    Vue.set(state, 'form', { show: false });
  },
};

export default {
  namespaced: true,
  state: { ...initialState },
  getters,
  actions,
  mutations
};
