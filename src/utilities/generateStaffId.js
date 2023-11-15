const getUsedStaffIdsFromLocalStorage = () => {
  const storedUsedStaffIds = localStorage.getItem("usedStaffIds");
  return storedUsedStaffIds
    ? new Set(JSON.parse(storedUsedStaffIds))
    : new Set();
};

const saveUsedStaffIdsToLocalStorage = (usedStaffIds) => {
  localStorage.setItem(
    "usedStaffIds",
    JSON.stringify(Array.from(usedStaffIds))
  );
};

const usedStaffIds = getUsedStaffIdsFromLocalStorage();

const generateStaffId = () => {
  const generateRandomId = () => {
    const randomId = Math.floor(10000 + Math.random() * 90000).toString();
    return new Set(randomId).size === 1 ? generateRandomId() : randomId;
  };

  let newId = generateRandomId();

  while (usedStaffIds.has(newId)) {
    newId = generateRandomId();
  }

  usedStaffIds.add(newId);
  saveUsedStaffIdsToLocalStorage(usedStaffIds);

  return newId;
};

export default generateStaffId;
