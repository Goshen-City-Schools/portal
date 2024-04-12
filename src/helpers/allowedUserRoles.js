const allowedUserRoles = (user, roles) => {
  return user?.accountType === "staff" && user.roles?.name === roles;
};

export default allowedUserRoles;
