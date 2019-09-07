import Vue from "vue";
import { ADD_TOAST_MESSAGE } from "vuex-toast";
import _ from "lodash";
import validate from "validate.js";

const types = {
  SET_FIELD: "SET_FIELD",
  CALC_REPAYMENT: "CALC_REPAYMENT",
  CREATE_FORM_SUCCESS: "CREATE_FORM_SUCCESS",
  CREATE_FORM_ERROR: "CREATE_FORM_ERROR"
};

const constraints = {
  firstName: {
    presence: { allowEmpty: false },
    length: {
      maximum: 20
    }
  },
  lastName: {
    presence: { allowEmpty: false },
    length: {
      maximum: 60
    }
  },
  address: {
    presence: { allowEmpty: false },
    length: {
      maximum: 255
    }
  },
  loanTerm: {
    presence: { allowEmpty: false },
    length: {
      maximum: 50
    }
  },
  email: {
    presence: { allowEmpty: false },
    email: true,
    length: {
      maximum: 255
    }
  },
  phone: {
    presence: { allowEmpty: false },
    format: {
      pattern: "[-+0-9]+",
    },
    length: {
      maximum: 15
    }
  },
  amount: {
    presence: { allowEmpty: false },
    format: {
      pattern: "[0-9]+",
    },
    numericality: {
      greaterThanOrEqualTo: 2000,
      lessThanOrEqualTo: 25000,
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
    list: [],
    createFormError: {},
  };
};

// initial state
const initialState = getDefaultState();

// getters
const getters = {
  form: state => state.form,
  list: state => state.list,
  createFormError: state => state.createFormError,
};

const InfoKeys = [
  "firstName",
  "lastName",
  "address",
  "phone",
  "email",
  "amount",
  "loanTerm",
];

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
    commit(types.CREATE_FORM_ERROR, errors);
    return success;
  },

  setField({ commit, dispatch }, { key, value }) {
    commit(types.SET_FIELD, { key, value });
    dispatch("validateField", [key]);
  },

  async submitCreateForm({ dispatch, commit, state }) {
    try {
      commit(types.SET_FIELD, { key: 'approved', value: false });
      const frmData = state.form;
      const success = await dispatch("validateField", InfoKeys);

      if (success) {
        if (frmData.amount < 2000 || frmData.amount > 25000) {
          dispatch(
            ADD_TOAST_MESSAGE,
            { text: 'Loan limit must be from 2000 to 25000', type: "danger" },
            { root: true }
          );
        } else {
          dispatch(
            ADD_TOAST_MESSAGE,
            { text: 'Create complete!', type: "success" },
            { root: true }
          );

          commit(types.CREATE_FORM_SUCCESS, frmData);
          this.$router.push({ name: 'approve' });
        }
      }
    } catch (e) {
      dispatch(
        ADD_TOAST_MESSAGE,
        { text: "Create fail", type: "danger" },
        { root: true }
      );
    }
  },

  calcRepayment({ commit }) {
    commit(types.CALC_REPAYMENT);
  },
};

// mutations
const mutations = {
  [types.SET_FIELD](state, params) {
    const newForm = { ...state.form, [params.key]: params.value };
    Vue.set(state, "form", newForm);
  },

  [types.CREATE_FORM_SUCCESS](state, frmData) {
      frmData.id = this.list.count+1;
      this.list.count+=1;
      frmData.amount = parseInt(frmData.amount);
      this.list.rows.push(
        frmData
      );
      Vue.set(state, "list", this.list);
      Vue.set(state, 'form', { });
  },

  [types.CREATE_FORM_ERROR](state, errors) {
    Vue.set(state, "createFormError", {
      ...state.createFormError,
      ...errors
    });
  },

  [types.CALC_REPAYMENT](state) {
    const frm = state.form;
    const interestRate = 1.15;
    if (frm.loanTerm && frm.amount) {
      frm.repayment = (frm.amount * interestRate) / (frm.loanTerm * 4);
    } else {
      frm.repayment = 0;
    }
  },
};

export default {
  namespaced: true,
  state: { ...initialState },
  getters,
  actions,
  mutations
};
