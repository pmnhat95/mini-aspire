import Vue from "vue";
import { sync } from "vuex-router-sync";
import VTooltip from "v-tooltip";
import VueAxios from "vue-axios";
import axios from "axios";
import AirbnbStyleDatepicker from "vue-airbnb-style-datepicker";

import App from "./App.vue";
import store from "./store";
import createRouter from "./router";
import helper from "./libs/helper";

Vue.config.productionTip = false;

const dataLoan = {
  count: 3,
  total: 1,
  rows: [
    {
      "firstName": "Nathan",
      "lastName": "Phan",
      "address": "65 Hong Kong 1",
      "phone": "66653213",
      "email": "nathan@gmail.com",
      "amount": 25000,
      "loanTerm": 6,
      "repayment": 1198,
      "approved": false,
      "id": 1
    },
    {
      "firstName": "Jay",
      "lastName": "Ki",
      "address": "08 Paris",
      "phone": "11198212",
      "email": "black@gmail.com",
      "amount": 19000,
      "loanTerm": 24,
      "repayment": 228,
      "approved": false,
      "id": 2
    },
    {
      "firstName": "Jack",
      "lastName": "Man",
      "address": "998 Thailand",
      "phone": "983213141",
      "email": "thailan@gmail.com",
      "amount": 13400,
      "loanTerm": 12,
      "repayment": 321,
      "approved": true,
      "id": 3
    }
  ]
};

// set default list Loans
store.list = dataLoan;
store.listRePayment = JSON.parse(JSON.stringify(dataLoan));

store.listRePayment.rows = store.listRePayment.rows.filter(loan => {
  return loan.approved;
});
store.listRePayment.count = store.listRePayment.rows.length;

// router, vuex
const router = createRouter(store);
store.$router = router;
sync(store, router);

// axios for vue auth
Vue.use(VueAxios, axios);

// tooltip
Vue.use(VTooltip);

// date picker
const datepickerOptions = {};
Vue.use(AirbnbStyleDatepicker, datepickerOptions);

const apiUrl = process.env.VUE_APP_API_URL;
const baseUrl =
  !process.env.VUE_APP_BASE_URL || process.env.VUE_APP_BASE_URL == "/"
    ? window.location.origin
    : process.env.VUE_APP_BASE_URL;

Vue.filter("numberDisplay", num => `${helper.numberDisplay(num)}`);
Vue.filter(
  "priceDisplay",
  (num, currency) => `${helper.priceDisplay(num, currency)}`
);
Vue.filter("dateDisplay", num => `${helper.dateDisplay(num)}`);
Vue.filter("badgeStatus", value => {
  const statuses = {
    pending: "secondary",
    uploading: "info",
    draft: "primary",
    under_review: "warning",
    live: "success",
    failed: "danger",
    rejected: "danger"
  };

  return `badge badge-${statuses[value] || "secondary"}`;
});
Vue.filter("backgroundColor", value => `bg-${value}`);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#main-wrapper");
