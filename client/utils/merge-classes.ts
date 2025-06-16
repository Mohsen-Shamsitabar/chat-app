const mergeClasses = (...classnames: (string | undefined)[]) => {
  return classnames.join(" ");
};

export default mergeClasses;
