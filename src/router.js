import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default store => {
  const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/create-personal-loans",
        name: "personal-loans",
        component: () =>
            import(/* webpackChunkName: "product" */ "./views/Loan/CreatePersonalLoan.vue"),
        meta: { theme: "default", title: "Create Personal loans", activeMenu: "personal-loans" }
      },
      {
        path: "/approve",
        name: "approve",
        component: () =>
            import(/* webpackChunkName: "product" */ "./views/Loan/ApproveLoan.vue"),
        meta: { theme: "default", title: "Approve", activeMenu: "approve" }
      },
      {
        path: "/repayment",
        name: "rePayment",
        component: () =>
            import(/* webpackChunkName: "product" */ "./views/Loan/PaymentLoan.vue"),
        meta: { theme: "default", title: "Re-payment", activeMenu: "rePayment" }
      },
      {
        path: "/",
        name: "index",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "./views/Home/Index.vue"),
        meta: { theme: "default", title: "Home", activeMenu: "index" }
      }
    ]
  });

  // This callback runs before every route change, including on page load.
  router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched
      .slice()
      .reverse()
      .find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched
      .slice()
      .reverse()
      .find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
      el => el.parentNode.removeChild(el)
    );

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags
      .map(tagDef => {
        const tag = document.createElement("meta");

        Object.keys(tagDef).forEach(key => {
          tag.setAttribute(key, tagDef[key]);
        });

        // We use this to track which meta tags we create, so we don't interfere with other ones.
        tag.setAttribute("data-vue-router-controlled", "");

        return tag;
      })
      // Add the meta tags to the document head.
      .forEach(tag => document.head.appendChild(tag));

    next();
  });

  return router;
}
