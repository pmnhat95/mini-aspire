<template>
  <div>
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h4 class="text-themecolor">Create Personal loans</h4>
      </div>
      <div class="col-md-7 align-self-center text-right">
        <div class="d-flex justify-content-end align-items-center">
          <breadcrumb :page="currentPage"/>
        </div>
      </div>
    </div>
    <form class="create-info-loan" @submit.prevent="() => {}">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body wizard-content">
              <div class="body row">
                <div class="col-md-12">
                  <input-text
                    name="amount"
                    label="How much do you need? ($)"
                    placeholder="$ 0"
                    :value="form.amount"
                    :required="true"
                    type="text"
                    @blur="calcRepayment()"
                    @keyup="calcRepayment()"
                    :errors="createFormError.amount"
                    @input="value => { setField({ key: 'amount', value }) }"
                  />
                </div>
                <div class="col-md-6">
                  <input-select
                    name="loanTerm"
                    label="For how long? (months)"
                    placeholder="Please choose!"
                    :value="form.loanTerm"
                    :required="true"
                    :options="actionOptions"
                    :errors="createFormError.loanTerm"
                    @change="calcRepayment()"
                    @input="value => { setField({ key: 'loanTerm', value }) }"
                  />
                </div>
                <div class="col-md-6">
                  <input-text
                    name="repayment"
                    label="Repayment (weekly)"
                    placeholder="$ 0"
                    type="text"
                    disabled="disabled"
                    :value="form.repayment | priceDisplay"
                    @input="value => { setField({ key: 'repayment', value }) }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body wizard-content">
              <div class="body row">
                <div class="col-md-6">
                  <input-text
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                    :value="form.firstName"
                    :required="true"
                    type="text"
                    :errors="createFormError.firstName"
                    @input="value => { setField({ key: 'firstName', value }) }"
                  />
                </div>
                <div class="col-md-6">
                  <input-text
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    :value="form.lastName"
                    :required="true"
                    type="text"
                    :errors="createFormError.lastName"
                    @input="value => { setField({ key: 'lastName', value }) }"
                  />
                </div>
                <div class="col-md-6">
                  <input-text
                    name="email"
                    label="Email"
                    placeholder="Email"
                    :value="form.email"
                    :required="true"
                    type="text"
                    :errors="createFormError.email"
                    @input="value => { setField({ key: 'email', value }) }"
                  />
                </div>
                <div class="col-md-6">
                  <input-text
                    name="phone"
                    label="Phone"
                    placeholder="Phone"
                    :value="form.phone"
                    :required="true"
                    type="text"
                    :errors="createFormError.phone"
                    @input="value => { setField({ key: 'phone', value }) }"
                  />
                </div>
                <div class="col-md-12">
                  <input-text
                    name="address"
                    label="Address"
                    placeholder="Address"
                    :value="form.address"
                    :required="true"
                    type="text"
                    :errors="createFormError.address"
                    @input="value => { setField({ key: 'address', value }) }"
                  />
                </div>
                <div class="col-md-12">
                  <form-button
                    type="success"
                    text="Submit"
                    :click="submitCreateForm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
    import { mapGetters, mapActions } from "vuex";

    import InputSelect from "@/components/Form/InputSelect";
    import InputText from "@/components/Form/InputText";
    import Pagination from "@/components/Misc/Pagination";
    import FormButton from "@/components/Form/FormButton";
    import Breadcrumb from "@/components/Common/Breadcrumb";

    export default {
        name: "CreateLoan",
        components: {
            InputSelect,
            Pagination,
            InputText,
            FormButton,
            Breadcrumb
        },
        computed: {
            ...mapGetters({
                form: "form/form",
                createFormError: "form/createFormError",
            }),
            actionOptions() {
              return [
                { value: "6", text: "6" },
                { value: "12", text: "12" },
                { value: "18", text: "18" },
                { value: "24", text: "24" },
                { value: "36", text: "36" }
              ];
            },
            routeName() {
                return this.$router.name;
            },
            currentPage() {
                return this.$store.state.route.meta.title;
            }
        },
        methods: {
            ...mapActions({
                setField: "form/setField",
                calcRepayment: "form/calcRepayment",
                submitCreateForm: "form/submitCreateForm",
            })
        }
    };
</script>
