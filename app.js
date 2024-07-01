// alert("we local");
if (
  window.location.href.includes("training-assessment-passed") ||
  window.location.href.includes("training-assessment-failed")
) {
  import("./score.js");
}
if (window.location.href.includes("training-assessment-introduction")) {
  import("./testPicker.js");
}

if (window.location.pathname.includes("/training-assessment-test")) {
  document.addEventListener("DOMContentLoaded", () => {
    let hasUserPassed;
    const answers = document.querySelectorAll(".answers");
    const submitBtn = document.getElementById("submit-btn");
    const formSubmit = document.getElementById("submit-btn-form");
    const scoreField = document.getElementById("score");
    const resultField = document.getElementById("result");
    const correctAnswers = document.querySelectorAll(".correct-answer span");
    const formLength = correctAnswers.length;

    // DYNAMICALLY CHANGE INPUT ATTRIBUTES
    answers.forEach((answer, index) => {
      const inputs = answer.querySelectorAll("input");
      const answerTexts = answer.querySelectorAll("span");
      inputs.forEach((input, i) => {
        const answerText = answerTexts[i].innerText;
        input.value = answerText;
        input.name = `answer-${index + 1}`;
      });
    });

    // ON 'FAKE' SUBMIT
    submitBtn.addEventListener("click", function () {
      let scoreCounter = 0;
      const userAnswers = [];

      // collect user answers
      answers.forEach((answer) => {
        const radios = answer.querySelectorAll('input[type="radio"]:checked');
        if (radios.length > 0) {
          userAnswers.push(radios[0].value);
        }
      });

      // check user answers against correct answers
      userAnswers.forEach((userAnswer) => {
        correctAnswers.forEach((correctAnswer) => {
          if (userAnswer === correctAnswer.innerText.trim()) {
            scoreCounter++;
          }
        });
      });

      // calc percentages
      const percentage = ((scoreCounter / formLength) * 100).toFixed(2);
      const percentageText = `${percentage}%`;

      // fill hidden form fields for backend reference
      scoreField.value = percentageText;
      resultField.value = hasUserPassed ? "Passed" : "Failed";

      resultChecker(percentage);

      // store score & result cookies
      document.cookie = `percentage=${encodeURIComponent(
        percentageText
      )}; path=/`;
      document.cookie = `hasUserPassed=${hasUserPassed}; path=/`;

      // log results
      console.log(`Percentage score: ${percentageText}`);
      console.log(`User has ${hasUserPassed ? "passed" : "failed"} the test`);

      // remove answers from DOM before submission to clean up form collection data
      answers.forEach((answer) => {
        answer.remove();
      });

      // actually submit the form
      formSubmit.click();
    });

    function resultChecker(score) {
      if (score > 80) {
        hasUserPassed = true;
        redirect("passed");
      } else {
        hasUserPassed = false;
        redirect("failed");
      }
    }

    function redirect(result) {
      setTimeout(() => {
        window.location.href = `/training-assessment-${result}`;
      }, [2500]);
    }
  });
}
