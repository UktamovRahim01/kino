let footer_navigation = document.querySelector(".footer-navigation")
let footer = document.querySelector("footer .container")



//! секция для E-mail рассылки футера
const mailingSection = document.createElement('section');
const mailingLogo = document.createElement('div');
const mailingLogoImage = document.createElement('img');
const mailingTitle = document.createElement('h3');
const mailingDescription = document.createElement('p');
const mailingForm = document.createElement('form');
const formTop = document.createElement('div');
const emailInput = document.createElement('input');
const subscribeButton = document.createElement('button');
const privacyDiv = document.createElement('div');
const privacyLabel = document.createElement('label');
const privacyCheckbox = document.createElement('input');
const checkboxSpan = document.createElement('span');
const privacyText = document.createElement('p');

mailingSection.className = 'mailing-list';
mailingLogo.className = 'logo';
mailingTitle.className = 'mailing-list__title';
mailingDescription.className = 'mailing-list__description';
formTop.className = 'form-top';
privacyDiv.className = 'privacy';
privacyLabel.className = 'custom-checkbox';
checkboxSpan.className = 'checkmark';

mailingForm.action = '';
mailingLogoImage.src = '../public/cinema_logo.svg';
mailingLogoImage.alt = 'Kinoarea';
emailInput.placeholder = 'Введите свой E-mail адрес';
emailInput.type = 'email';
emailInput.name = "email"
subscribeButton.type = 'submit';
privacyCheckbox.type = 'checkbox';
subscribeButton.textContent = 'Подписаться';
mailingTitle.textContent = 'Подпишитесь на E-mail рассылку';
mailingDescription.textContent = 'Если хотите быть в курсе последних новостей и новинок кино - заполните форму ниже и оформите бесплатную E-mail рассылку!';
privacyText.innerHTML = 'Соглашаюсь на условия <a href="#" class="mark">политики конфиденциальности</a>';

mailingLogo.append(mailingLogoImage);
formTop.append(emailInput, subscribeButton);
privacyLabel.append(privacyCheckbox, checkboxSpan);
privacyDiv.append(privacyLabel, privacyText);
mailingForm.append(formTop, privacyDiv);
mailingSection.append(mailingLogo, mailingTitle, mailingDescription, mailingForm);

footer.append(mailingSection);




//! секция для навигации футера
const footerNavigationSection = document.createElement('section');
const footerNavTop = document.createElement('div');
const socialList = document.createElement('ul');

footerNavigationSection.className = 'footer-navigation';
footerNavTop.className = 'footer-navigation__top';
socialList.className = 'social-list';

const socialLinksData = [
	{ href: '#', src: '/public/vk-logo.svg', alt: 'vk' },
	{ href: '#', src: '/public/instagram-logo.svg', alt: 'instagram' },
	{ href: '#', src: '/public/facebook.svg', alt: 'facebook' },
	{ href: '#', src: '/public/twitter.svg', alt: 'twitter' },
	{ href: '#', src: '/public/youtube-logo.svg', alt: 'youtube' }
];

socialLinksData.forEach(linkData => {
	const socialListItem = document.createElement('li');
	const socialLink = document.createElement('a');
	const socialImage = document.createElement('img');
	socialListItem.className = 'social-list__item';
	socialLink.href = linkData.href;
	socialImage.src = linkData.src;
	socialImage.alt = linkData.alt;
	socialLink.append(socialImage);
	socialListItem.append(socialLink);
	socialList.append(socialListItem);
});

footerNavTop.append(socialList);

const footerNavCenter = document.createElement('nav');
const navigationList = document.createElement('ul');
const navigationLinksData = ['Афиша', 'Медиа', 'Фильмы', 'Актёры', 'Новости', 'Подборки', 'Категории'];

footerNavCenter.className = 'footer-navigation-center';
navigationList.className = 'navigation__list';

navigationLinksData.forEach(linkText => {
	const navigationListItem = document.createElement('li');
	const navigationLink = document.createElement('a');
	navigationLink.href = '#';
	navigationLink.textContent = linkText;
	navigationListItem.append(navigationLink);
	navigationList.append(navigationListItem);
});

const footerNavBottom = document.createElement('div');
const copyrightText = document.createElement('p');
const privacyLink = document.createElement('a');

footerNavBottom.className = 'footer-navigation__bottom';
copyrightText.textContent = '2020 © Kinoarea. Все права защищены';
privacyLink.href = '#';
privacyLink.textContent = 'Политика конфиденциальности';

footerNavCenter.append(navigationList);
footerNavBottom.append(copyrightText, privacyLink);
footerNavigationSection.append(footerNavTop, footerNavCenter, footerNavBottom);

footer.append(footerNavigationSection);
