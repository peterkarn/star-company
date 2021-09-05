document.addEventListener("DOMContentLoaded", () => {
  const steps = Array.from(document.querySelectorAll(".hero__form-step")),
    form = document.querySelector(".hero__form"),
    mianFormBtn = form.querySelector(".mainBtn"),
    prevFormBtn = form.querySelector(".btn__prev"),
    mianFormPassword = form.querySelector("input[type=password]"),
    headerBtn = document.querySelector(".header__btn"),
    headerForm = document.querySelector(".header__form"),
    emailInputs = document.querySelectorAll('input[type="email"]'),
    stepsList = document.querySelector(".hero__form-progress"),
    regExp = /^([\w\.\+]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/;

  let i = 0;

  // validation
  emailInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      let value = e.target.value;
      const inputParent = input.closest(".email-wrapper");
      const inputFormBtn = input.closest(".form").querySelector(".mainBtn");
      if (!regExp.test(value)) {
        inputParent.classList.add("invalid");
        inputFormBtn.disabled = true;
      } else {
        inputParent.classList.remove("invalid");
        inputFormBtn.disabled = false;
      }
    });
  });

  document.querySelector('button[disabled]').addEventListener('mouseenter', () => {
    alert('123')
  })

  //show header login form

  headerBtn.addEventListener("click", (e) => {
    headerForm.classList.remove("hidden");
    headerBtn.classList.add("hidden");
  });

  //generate step indicators

  for (step in steps) {
    const dot = document.createElement("li");
    dot.classList.add("hero__form-dot");
    stepsList.append(dot);
  }

  const dotsArray = Array.from(document.querySelectorAll(".hero__form-dot"));
  dotsArray[0].classList.add("hero__form-dot_complete");


  //multiStep functionality

  form.addEventListener("click", (e) => {
    if (e.target.matches(".btn_next") && i >= 0 && i < steps.length - 1) {
      i++;
      changeStep(i);
      dotsArray[i].classList.add("hero__form-dot_complete");
    }
    if (e.target.matches(".btn__prev") && i > 0) {
      i--;
      changeStep(i);
      dotsArray[i + 1].classList.remove("hero__form-dot_complete");
    }
  });

  function changeStep(i) {
    const currentStep = document.querySelector(".hero__form-step.active");
    const nextStep = steps[i];
    currentStep.classList.remove("active");
    nextStep.classList.add("active");
    if (document.querySelector(".hero__form-step.email-wrapper.active")) {
      mianFormBtn.disabled = true;
      prevFormBtn.addEventListener('click', () => mianFormBtn.disabled = false);

    }
    if (i === steps.length - 1) {
      mianFormBtn.disabled = true;
      mianFormBtn.innerText = "Start now";
    }
  }

  function formSendAllow() {
    mianFormBtn.classList.remove("btn_next");
    mianFormBtn.classList.add("btn_done");
    mianFormBtn.disabled = false;
    mianFormBtn.type = "submit";
  }

  function formSendDisAllow() {
    mianFormBtn.classList.add("btn_next");
    mianFormBtn.classList.remove("btn_done");
    mianFormBtn.disabled = true;
    mianFormBtn.type = "button";
  }

  mianFormPassword.addEventListener("input", (e) => {
    e.target.value.length > 5 ? formSendAllow() : formSendDisAllow();
  });

  //form send

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    fetch("http://www.mocky.io/v2/5dfcef48310000ee0ed2c281", {
      method: "POST",
      body: new FormData(form),
    }).then((data) => {
      // console.log(data);
      form.reset();
      i = 0;
      changeStep(i);
      alert("data successfully sent");
    });
  });

  // webp bg support

  function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {

    if (support == true) {
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  });
});
