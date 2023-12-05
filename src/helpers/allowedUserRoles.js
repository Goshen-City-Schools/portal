const allowedUserRoles = (user, roles) => {
  return (
    user?.accountType === "staff" &&
    roles.some((role) => user?.roles.includes(role))
  );
};

export default allowedUserRoles;
