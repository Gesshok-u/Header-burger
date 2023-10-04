/*  ---------  Определение на мобильном ли устройстве открыт сайт  ---------  */

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        )
    }
};

/*  ---------  arrow link-dropdawn header  ---------  */

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu_body__arrow');
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function(e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }
} else {
    document.body.classList.add('_pc');
}



/*  ---------  Header burger menu ---------  */

const iconMenu = document.querySelector('.menu_icon');
const menuBody = document.querySelector('.menu_body');

if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}



/*  ---------  scroll header links  ---------  */

const headerLinks = document.querySelectorAll('.menu_body__link[data-goto]');

if (headerLinks.length > 0) {
    headerLinks.forEach (headerLink => {
        headerLink.addEventListener("click", onHeaderLinkClick);
    });

    function onHeaderLinkClick(e) {
        const headerLink = e.target;
        if (headerLink.dataset.goto && document.querySelector(headerLink.dataset.goto)) {
            const gotoBlock = document.querySelector(headerLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            };

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });

            e.preventDefault();
        }
    }
}