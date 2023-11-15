const getUsedIdsFromLocalStorage = () => {
  const storedUsedIds = localStorage.getItem("usedIds");
  return storedUsedIds ? new Set(JSON.parse(storedUsedIds)) : new Set();
};

const saveUsedIdsToLocalStorage = (usedIds) => {
  localStorage.setItem("usedIds", JSON.stringify(Array.from(usedIds)));
};

const usedIds = getUsedIdsFromLocalStorage();

const generateId = () => {
  const generateRandomId = () => {
    const randomId = Math.floor(10000 + Math.random() * 90000).toString();
    return new Set(randomId).size === 1 ? generateRandomId() : randomId;
  };

  let newId = generateRandomId();

  while (usedIds.has(newId)) {
    newId = generateRandomId();
  }

  usedIds.add(newId);
  saveUsedIdsToLocalStorage(usedIds);

  return newId;
};

export default generateId;
