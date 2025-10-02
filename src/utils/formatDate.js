//** took from AI, have 0 clue what the code is doing
//** Uses the browser's locale + timezone automatically
const formatDate = (isoString) => {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
    new Date(isoString)
  );
};

export default formatDate;
