const allowedUserRoles = (user, roles) => {
  return user?.accountType === "staff" && roles.includes(user.roles?.id);
};

export default allowedUserRoles;
