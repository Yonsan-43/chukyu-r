import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import AOS from "aos";
import "aos/dist/aos.css";

// スクロール
document
  .querySelectorAll("a[href^='#']:not([href='#'])")
  .forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
      let targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
      closeBgmenu();
    });
  });

// swiper
const achievementSwiper = new Swiper(".p-achievement__swiper", {
  loop: true,
  speed: 400,
  effect: "slide",
  slidesPerView: 2.2,
  slidesPerGroup: 1,
  autoHeight: true,
  spaceBetween: 80,
  centeredSlides: false,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1.5,
      slidesPerGroup: 1,
      // centeredSlides:true,
    },
    350: {
      slidesPerView: 1.9,
      slidesPerGroup: 1,
    },
    500: {
      slidesPerView: 2.5,
      slidesPerGroup: 2,
    },
    700: {
      slidesPerView: 3,
      slidesPerGroup: 2,
    },
    900: {
      slidesPerView: 3,
      slidesPerGroup: 1,
    },
    1080: {
      slidesPerView: 4,
      slidesPerGroup: 1,
    },
    1300: {
      slidesPerView: 5,
      slidesPerGroup: 1,
    },
  },
});

const caseSwiper = new Swiper(".p-case__swiper", {
  loop: true,
  // spaceBetween: true,
  // effect:'slide',
  slidesPerView: 1,
  slidesPerGroup: 1,
  autoHeight: true,
  spaceBetween: 70,
  centeredSlides: true,
  breakpoints: {
    1000: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      centeredSlides: false,
    },
    900: {
      slidesPerView: 1.7,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 1.5,
    },
    700: {
      slidesPerView: 1.8,
    },
    600: {
      slidesPerView: 1.5,
    },
    400: {
      slidesPerView: 1.2,
      centeredSlides: true,
      // spaceBetween:true,
      // slidesPerView:1,
      // autoWidth:true,
    },
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      centeredSlides: true,
    },
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// アコーディオン
document.querySelectorAll(".p-faq__accordion details").forEach((details) => {
  details.addEventListener("click", (event) => {
    event.preventDefault();
    const contentA = details.querySelector(".p-faq__accordion__item-a");
    const contentQ = details.querySelector(".p-faq__accordion__item-q");
    const icon = details.querySelector(".c-icon--Q");
    // Function to get padding based on screen width
    const getPadding = () => {
      if (window.innerWidth <= 768) {
        return "10px"; // For mobile devices
      } else {
        return "24px"; // For larger screens
      }
    };

    if (details.open) {
      // Close animation
      contentQ.style.backgroundColor = "#FFFFFF";
      contentQ.style.color = "#333333";
      icon.style.backgroundColor = "#007FC6";
      icon.style.color = "#FFFFFF";
      const animation = contentA.animate(
        [
          {
            maxHeight: contentA.scrollHeight + "px",
            paddingBlock: getPadding(),
            opacity: "1"
          },
          { maxHeight: "0", paddingBlock: "0",opacity: "0" },
        ],
        {
          duration: 500,
          easing: "ease-out",
        }
      );
      animation.onfinish = () => {
        details.removeAttribute("open");
        contentA.style.maxHeight = "";
        contentQ.style.borderRadius = "10px"
        // icon.style.backgroundColor = "#007FC6";
      };
    } else {
      // Open animation
      details.setAttribute("open", "");
      // contentA.style.opacity = "0";
      contentQ.style.backgroundColor = "#007FC6";
      contentQ.style.color = "#FFFFFF";
      icon.style.backgroundColor = "#FFFFFF";
      icon.style.color = "#007FC6";
      contentQ.style.borderRadius = "10px 10px 0 0";
      requestAnimationFrame(() => {
        contentA.style.maxHeight = contentA.scrollHeight + "px";
        contentA.animate(
          [
            { maxHeight: "0", paddingBlock: "0",opacity: "0"},
            {
              maxHeight: contentA.scrollHeight + "px",
              paddingBlock: getPadding(),
              opacity: "1"
            },
          ],
          {
            duration: 500,
            easing: "ease-out",
          }
        ).onfinish = () => {
          contentA.style.maxHeight = "";
          // contentA.style.opacity = 1;
          // contentQ.style.borderRadius = "10px 10px 0 0"
        };
      });
    }
  });
});

// ハンバーガーメニュー
const jsHamburger = document.getElementById("js-hamburger");
const Body = document.body;
const jsGlobalMenu = document.getElementById("js-global-menu");
const hamburgerList = document.querySelector(".p-hamburger");
jsHamburger.addEventListener("click", function () {
  // Body
  if (this.getAttribute("aria-expanded") == "false") {
    this.setAttribute("aria-expanded", true);
    jsGlobalMenu.style.visibility = "visible";
    hamburgerList.style.top = "";
    Body.style.overflow = "hidden";
    jsGlobalMenu.setAttribute("aria-hidden", false);
  } else {
    this.setAttribute("aria-expanded", false);
    jsGlobalMenu.style.visibility = "hidden";
    // hamburgerList.style.top = '-100vh'
    jsGlobalMenu.setAttribute("aria-hidden", "true");
    Body.style.overflow = "visible";
  }
});

function closeBgmenu() {
  Body.style.overflow = "visible";
  jsHamburger.setAttribute("aria-expanded", false);
  jsGlobalMenu.style.visibility = "hidden";
  jsGlobalMenu.setAttribute("aria-hidden", "true");
  // document.querySelector(".hamburger").style.position = "absolute";
}

//AOS設定
AOS.init({
  offset: 200, // アニメーションが始まるスクロール量
  duration: 600, // アニメーションの持続時間（ミリ秒）
  easing: "ease-in-out", // アニメーションのイージング
  delay: 200, // アニメーションの遅延（ミリ秒）
});
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    AOS.refresh();
  });
}

//フォーム

document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".p-form");
  forms.forEach((form) => {
    const downLoadBtn = form.querySelector(".p-form__btn");
    const endMessage = form.querySelector(".p-form__end-msg");

    const updateDlButtonState = () => {
      const firstName = form.querySelector(".firstName");
      const lastName = form.querySelector(".lastName");
      const companyName = form.querySelector(".companyName");
      const emailInput = form.querySelector('input[type="email"]');
      const telInput = form.querySelector('input[type="tel"]');

      const allFilled =
        firstName.value.trim() !== "" &&
        lastName.value.trim() !== "" &&
        companyName.value.trim() !== "" &&
        emailInput.value.trim() !== "" &&
        telInput.value.trim() !== "";

      if (allFilled) {
        downLoadBtn.setAttribute("aria-disabled", "false"); // 有効
        downLoadBtn.classList.remove("u-disabled"); //
      } else {
        downLoadBtn.setAttribute("aria-disabled", "true"); // 無効化
        downLoadBtn.classList.add("u-disabled"); //
      }
    };

    // フォーム内のすべての input にイベントリスナーを設定
    form.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", updateDlButtonState);
    });

    downLoadBtn.addEventListener("click", function (event) {
      if (downLoadBtn.getAttribute("aria-disabled") === "true") {
        event.preventDefault(); // 無効な場合クリックを無効化
      }else{
        event.preventDefault(); // 無効な場合クリックを無効化
        form.reset();
        downLoadBtn.style.display = "none";
        endMessage.classList.add("show");
      }
    });

    // フォーム送信処理
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // デフォルトのフォーム送信を無効化

      const formData = new FormData(form);
      const xhr = new XMLHttpRequest();

      xhr.open(
        "POST",
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLScWnmyxWMAeoCT0wyYItJpmcOWZnV0fZVjZL4HEeB1MOblwpg/formResponse",
        true
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          // リクエストが完了したら
          if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300)) {
            // 成功時
            endMessage.classList.add("show");
              downLoadBtn.style.display = "none";
              form.reset(); // フォームをリセット
          } else {
            alert("送信中にエラーが発生しました。再試行してください。");
          }
        }
      };

      xhr.onerror = function () {
        alert(
          "ネットワークエラーが発生しました。インターネット接続を確認してください。"
        );
      };

      xhr.send(formData);
    });
  });
});
