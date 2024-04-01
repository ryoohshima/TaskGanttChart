/**
 * idからメンバー名を取得する関数
 * function getMemberName
 * @param {string} id - The member id
 * @param {Array} members - The members array
 * @returns {string} - The member name
 */
const getMemberName = (id, members) => {
  return members.find((member) => member.id === id && member.name).name
};

/**
 * メンバー名からidを取得する関数
 * function getMemberId
 * @param {string} name - The member name
 * @param {Array} members - The members array
 * @returns {string} - The member id
 */
const getMemberId = (name, members) => {
  return members.find((member) => member.name === name && member.id).id
}

export { getMemberName, getMemberId };