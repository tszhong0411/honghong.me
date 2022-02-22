const formatDate = (date, locale) => {
  const options: object = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const now = new Date(date).toLocaleDateString(locale, options);

  return now;
};

export default formatDate;
