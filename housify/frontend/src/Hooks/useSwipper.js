export const swipper = (direction) => {
  const { current } = scrollRef;

  if (direction === "left") {
    current.scrollLeft -= 300;
  } else {
    current.scrollLeft += 300;
  }
};
