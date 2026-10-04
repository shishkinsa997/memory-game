function getNumberOfCards(user = JSON.parse(localStorage.getItem("user"))) {
  const numberOfCards =
    user?.difficulty === "easy"
      ? 8
      : user?.difficulty === "normal"
        ? 15
        : user?.difficulty === "hard"
          ? 21
          : 2;
  return numberOfCards;
}

export { getNumberOfCards };
