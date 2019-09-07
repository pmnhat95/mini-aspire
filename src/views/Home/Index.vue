<template>
  <div class="text-center">
    <div class="row page-titles">
      <div class="col-md-12">
        <h1 class="text-themecolor">Get up to $25,000 fast</h1>
        <h3 class="text-themecolor">Borrow Money</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="card-title m-t-40">Personal Loans</h2>
                        <h4>From $2,000 to $25,000</h4>
                        <h3>Better value. Flexible. Fair.</h3>
                        <router-link
                          :to="{ name: 'personal-loans' }"
                          class="btn btn-success waves-effect waves-light m-t-20 m-b-40 get-personal-loan"
                        >
                          <span class="hide-menu">Get a personal loan</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="card-title m-t-40">MoneyMe Freedom</h2>
                        <h4>Line of credit up to $5,000</h4>
                        <h3>Use available credit 24/7</h3>
                        <button class="btn btn-success waves-effect waves-light m-t-20 m-b-40" disabled>Coming soon</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "home",
  components: {
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
    ...mapActions({
    })
  }
};
</script>
