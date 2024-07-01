document.addEventListener("DOMContentLoaded", () => {
  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  function renderPercentageFromCookie() {
    const percentageCookie = getCookie("percentage");
    const hasUserPassedCookie = getCookie("hasUserPassed");

    // Check cookies and redirect accordingly
    if (
      !percentageCookie ||
      !hasUserPassedCookie ||
      (window.location.pathname.includes("passed") &&
        hasUserPassedCookie === "false") ||
      (window.location.pathname.includes("failed") &&
        hasUserPassedCookie === "true")
    ) {
      window.location.href = "/training-assessment-introduction";
      return;
    }

    // Display percentage if cookies are valid
    const scoreOutput = document.getElementById("scoreOutput");
    scoreOutput.textContent = percentageCookie;
  }

  renderPercentageFromCookie();
});
