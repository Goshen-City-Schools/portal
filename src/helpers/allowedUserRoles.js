const allowedUserRoles = (user, roles) => {
  return (
    user?.accountType === "staff" &&
    roles.some((role) => user?.roles[0]?.name === role)
  );
};

export default allowedUserRoles;
