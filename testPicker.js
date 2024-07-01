// RANDOM TEST PAGE LINK
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".to-training-assessment");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const randomNum = Math.floor(Math.random() * 4) + 1;
      window.location.href = `training-assessment-test-${randomNum}`;
    });
  });
});
