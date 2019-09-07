<template>
  <div>
    <div class="row page-titles">
      <div class="col-md-5 align-self-center">
        <h4 class="text-themecolor">Approve</h4>
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
                <table class="table table-striped dataTable no-footer approve-list">
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
                          class="btn waves-effect waves-light btn-outline-primary btn-approve"
                          :class="{ disabled: lst.approved }"
                          :click="() => approvedLoan(lst.id)"
                        >
                          Approved
                        </link-button>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
    import Pagination from "@/components/Misc/Pagination";
    import LinkButton from "@/components/Misc/LinkButton";
    import Breadcrumb from "@/components/Common/Breadcrumb";

    export default {
        name: "ApproveLoan",
        components: {
            LoadingContainer,
            Pagination,
            LinkButton,
            Breadcrumb
        },
        beforeMount() {
            this.getList();
        },
        computed: {
            ...mapGetters({
                list: "loan/list",
                search: "loan/search",
                loading: "loan/loading",
                total: "loan/total",
                page: "loan/page"
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
                getList: "loan/getList",
                submitAprroved: "loan/submitAprroved",
            }),
            async approvedLoan(loanId) {
                await this.submitAprroved(loanId);
            }
        }
    };
</script>
