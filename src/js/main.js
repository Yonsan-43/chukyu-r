import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';


// スクロール
document.querySelectorAll("a[href^='#']:not([href='#'])").forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            var targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        closeBgmenu();
    });
});

// swiper
const  achievementSwiper = new Swiper('.p-achievement__swiper', {
    loop:true,
    speed:400,
    effect:'slide',
    slidesPerView: 2.2,
    slidesPerGroup:1,
    autoHeight: true,
    spaceBetween: 80,
    centeredSlides:false,
    autoplay:{
        delay: 4000,
        disableOnInteraction:false,
    },
    breakpoints:{
        640: {
            // slidesPerView: 2,
            // slidesPerGroup: 2,
        },
        900: {
            slidesPerView: 3,
            slidesPerGroup: 1,
        },
        1080: {
            slidesPerView: 4,
            slidesPerGroup:1,
        },
        1300: {
            slidesPerView:5,
            slidesPerGroup:1,
        },
    },
  });

  const caseSwiper = new Swiper('.p-case__swiper', {
    loop:true,
    // spaceBetween: true,
    // effect:'slide',
    slidesPerView: 1,
    slidesPerGroup: 1,
    autoHeight: true,
    spaceBetween: 70,
    centeredSlides:true,
    breakpoints:{
        1000:{
            slidesPerView:2,
            slidesPerGroup: 2,
            centeredSlides:false,
        },
        900:{
            slidesPerView:1.7,
            centeredSlides:true,
        },
        768:{
            slidesPerView:1.5,
        },
        700:{
            slidesPerView:1.8,
        },
        600:{
            slidesPerView:1.5,
        },
        400:{
            slidesPerView:1.2,
            centeredSlides:true,
            // spaceBetween:true,
            // slidesPerView:1,
            // autoWidth:true,
        },
        0:{
            slidesPerView:1,
            slidesPerGroup:1,
            centeredSlides:true,
        }
    },

 navigation: {
   nextEl: '.swiper-button-next',
   prevEl: '.swiper-button-prev',
 },

});

// アコーディオン
document.querySelectorAll('.p-faq__accordion details').forEach(details => {
    details.addEventListener('click', event => {
        event.preventDefault();
        const contentA = details.querySelector('.p-faq__accordion__item-a');
        const contentQ = details.querySelector('.p-faq__accordion__item-q');
        const imgToggle = details.querySelectorAll('.p-faq__accordion__item-q__content img');
        const icon = details.querySelector('.c-icon--Q');
        // Function to get padding based on screen width
        const getPadding = () => {
            if (window.innerWidth <= 768) {
                return '10px'; // For mobile devices
            } else {
                return '24px'; // For larger screens
            }
        };

        if (details.open) {
            // Close animation
            const animation = contentA.animate([
                { maxHeight: contentA.scrollHeight + 'px', opacity: 1, paddingTop: getPadding() },
                { maxHeight: '0', opacity: 0, paddingTop: '0' },
            ], {
                duration: 300,
                easing: 'ease-out'
            });
            animation.onfinish = () => {
                details.removeAttribute('open');
                contentA.style.maxHeight = '';
                contentQ.style.backgroundColor = '#FFFFFF';
                contentQ.style.color = '#333333';
                icon.style.backgroundColor = '#007FC6'
                icon.style.color = '#FFFFFF'
            };
        } else {
            // Open animation
            details.setAttribute('open', '');
            contentA.style.maxHeight = '0';
            contentA.style.opacity = '0';
            requestAnimationFrame(() => {
                contentA.animate([
                    { maxHeight: '0', paddingTop: '0' },
                    { maxHeight: contentA.scrollHeight + 'px',  paddingTop: getPadding() }
                ], {
                    duration: 300,
                    easing: 'ease-in'
                }).onfinish = () => {
                    contentA.style.maxHeight = '';
                    contentA.style.opacity = 1;
                    contentA.style.paddingTop = getPadding();
                    contentQ.style.backgroundColor = '#007FC6';
                    contentQ.style.color = '#FFFFFF';
                    icon.style.backgroundColor = '#FFFFFF'
                    icon.style.color = '#007FC6'
                };
            });
        }
    });
});

// ハンバーガーメニュー
const jsHamburger = document.getElementById('js-hamburger');
const Body = document.body;
const jsGlobalMenu = document.getElementById('js-global-menu');
const hamburgerList = document.querySelector('.p-hamburger')
jsHamburger.addEventListener('click', function(){
    // Body
    if (this.getAttribute('aria-expanded') == 'false') {
        this.setAttribute('aria-expanded', true)
        jsGlobalMenu.style.visibility = 'visible'
        hamburgerList.style.top = ''
        Body.style.overflow = 'hidden'
        jsGlobalMenu.setAttribute('aria-hidden', false)
    }else{
        this.setAttribute('aria-expanded', false)
        jsGlobalMenu.style.visibility = 'hidden'
        hamburgerList.style.top = '-100vh'
        jsGlobalMenu.setAttribute('aria-hidden', 'true')
        Body.style.overflow = "visible";
    }
});

function closeBgmenu() {
    jsHamburger.setAttribute('aria-expanded', false)
    jsGlobalMenu.style.visibility = 'hidden'
    jsGlobalMenu.setAttribute('aria-hidden', 'true')
    document.querySelector('.hamburger').style.position = 'absolute';
  }
