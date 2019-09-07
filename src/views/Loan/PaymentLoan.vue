<template>
  <div>
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h4 class="text-themecolor">Re-payment</h4>
        <span class="text-warning">(To pay, your loan must be approved)</span>
      </div>
      <div class="col-md-7 align-self-center text-right">
        <div class="d-flex justify-content-end align-items-center">
          <breadcrumb :page="currentPage"/>
        </div>
      </div>
    </div>
    <loading-container :loading="loading">
      <div v-if="!list || list.length == 0" class="text-center">
        Data not found!
      </div>
      <div v-else class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped dataTable no-footer repayment-list">
                  <thead>
                  <tr>
                      <th>Addess</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Amount</th>
                      <th>Loan Term (months)</th>
                      <th>Re-payment (weekly)</th>
                      <th>Status</th>
                      <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                    v-for="(lst, index) in list"
                    :class="index % 2 == 0 ? 'odd' : 'even'"
                    :key="lst.id"
                  >
                    <td>{{ lst.address }}</td>
                    <td>{{ lst.phone }}</td>
                    <td>{{ lst.email }}</td>
                    <td><span class="text-success">{{ lst.amount | priceDisplay }}</span></td>
                    <td>{{ lst.loanTerm }}</td>
                    <td>{{ lst.repayment | priceDisplay}}</td>
                    <td>
                      <span :class="lst.approved ? 'label-success' : 'label-danger'" class="label">
                        {{lst.approved ? 'Approved' : 'Pending'}}
                      </span>
                    </td>
                    <td>
                      <div>
                        <link-button
                          class="btn waves-effect waves-light btn-outline-primary btn-repay"
                          :class="{ disabled: !lst.approved }"
                          :click="() => openPaymentForm(lst.id)"
                        >
                          Repay
                        </link-button>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <modal
            :show="form.show"
            title="Payment information"
            :close="() => setField({ key: 'show', value: false })"
          >
            <form @submit.prevent="() => {}">
              <div class="row">
                <div class="col-md-12">
                  <input-text
                    name="money"
                    :value="form.money"
                    label="Money"
                    placeholder="$ 0"
                    :required="true"
                    type="text"
                    :errors="paymentFormError.money"
                    @input="value => { setField({ key: 'money', value }) }"
                  />
                </div>
              </div>
            </form>
            <div slot="footer">
              <link-button
                class="btn btn-default waves-effect"
                :click="() => setField({ key: 'show', value: false })"
              >
                Cancel
              </link-button>
              <form-button
                type="success"
                class="submit-repayment"
                text="Submit"
                :click="updatePaymentForm"
              />
            </div>
          </modal>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 d-flex justify-content-center">
          <pagination
            :route-name="routeName"
            :query="search"
            :current="page"
            :total="total"
          />
        </div>
      </div>
    </loading-container>
  </div>
</template>


<script>
    import { mapGetters, mapActions } from "vuex";

    import LoadingContainer from "@/components/Misc/LoadingContainer";
    import InputSelect from "@/components/Form/InputSelect";
    import InputText from "@/components/Form/InputText";
    import Pagination from "@/components/Misc/Pagination";
    import Modal from "@/components/Misc/Modal";
    import LinkButton from "@/components/Misc/LinkButton";
    import FormButton from "@/components/Form/FormButton";
    import Breadcrumb from "@/components/Common/Breadcrumb";

    export default {
        name: "PaymentLoan",
        components: {
            LoadingContainer,
            InputSelect,
            Pagination,
            Modal,
            LinkButton,
            InputText,
            FormButton,
            Breadcrumb
        },
        beforeMount() {
            this.getListRePayment();
        },
        computed: {
            ...mapGetters({
                form: "loan/form",
                list: "loan/listRePayment",
                search: "loan/search",
                loading: "loan/loading",
                total: "loan/totalRePayment",
                page: "loan/page",
                paymentFormError: "loan/paymentFormError",
            }),
            routeName() {
                return this.$router.name;
            },
            currentPage() {
                return this.$store.state.route.meta.title;
            }
        },
        methods: {
            ...mapActions({
                setField: "loan/setField",
                getListRePayment: "loan/getListRePayment",
                openPaymentForm: "loan/openPaymentForm",
                updatePaymentForm: "loan/updatePaymentForm",
            }),
        }
    };
</script>
