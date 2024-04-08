const updateData = (arr, pageCurrent) => {
  const pageSize = 20;
  const startIndex = (pageCurrent - 1) * 20;
  const endIndex = pageSize * pageCurrent;
  const moviesModified = arr.slice(startIndex, endIndex);
  const total_page = Math.ceil(arr.length / pageSize);
  return {
    moviesModified,
    total_page,
  };
};

module.exports = updateData;
