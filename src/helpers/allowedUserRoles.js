const allowedUserRoles = (user, roles) => {
  return roles.some((role) => user?.roles.includes(role));
};

export default allowedUserRoles;
