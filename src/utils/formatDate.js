//** took from AI, have 0 clue what the code is doing
//** Uses the browser's locale + timezone automatically
const formatDate = (isoString) => {
  try {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
      new Date(isoString)
    );
  } catch (err) {
    console.error(`formatDate error: ${err.message}`);
    return "";
  }
};

export default formatDate;

