const checkRole = (name, user) => {
  switch (name) {
    case "userList":
    case "userDetail":
      return user.role === "admin";
    case "upload":
    case "uploadFeed":

    case "productList":
    case "orderNew":

    case "creditForm":
    case "feedList":
    case "profile":
    case "setting":
      return ["seller"].includes(user.role);
    case "orderDetail":
    case "orderList":
    case "transactionList":
    case "transactionDetail":
      return ["admin", "seller"].includes(user.role);
    default:
      return true;
  }
};

export default {
  checkRole
};
