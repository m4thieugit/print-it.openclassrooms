const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
]

/**
 * La classe du Carousel
 */
class Carousel {
	/**
	 * Constructeur de la classe
	 * @param {Array<Object>} slides le tableau contenant les informations de chaque slide
	 * @param {number} speed la vitesse d'affichage automatique des slides en millisecondes
	 */
	constructor(slides, speed = 5000) {
		this.slides = slides; // Tableau contenant toutes les slides
		this.dotsContainer = document.querySelector('.dots'); // La div qui contient tous les dots
		this.banner_container = document.querySelector('#banner'); // La div de la bannière
		this.banner_img = document.querySelector('.banner-img'); // L'image de la bannière
		this.banner_img.style.transition = 'opacity 0.3s ease-in-out'; // Ajout d'une transition pour un effet fade en reduisant l'opacité de l'image
		this.banner_description = document.querySelector('#banner p'); // Le titre et la description de la bannière
		this.current_slide = 0; // La position actuelle du carousel
		this.speed = speed; // La vitesse d'affichage automatique des slides
		this.setup(); // Lancement du carousel
	}

	/**
	 * Fonction permettant la mise en route du carousel
	 */
	setup() {
		try {
			this.displayDots(); // Lancement de l'affichage des dots
			this.displayArrows(); // Lancement de l'affichage des flèches
			this.displayCurrentSlide(); // Lancement de l'affichage de la slide actuelle
			this.startInterval(); // Lancemement de l'interval de changement des slides
		} catch (err) { throw new Error('[CAROUSEL] Une erreur est survenue : ' + err.message); }
	}

	/**
	 * Fonction permettant l'affichage des dots
	 */
	displayDots() {
		for (let i = 0; i < this.slides.length; i++) {
			const dot = document.createElement('div');
			dot.classList.add('dot');
			dot.style.cursor = 'pointer'; // Modification du curseur pour indicer que l'élément est cliquable

			// On rend le point cliquable avec un évènement
			dot.addEventListener('click', () => {
				this.current_slide = i;
				this.displayCurrentSlide(); // Mise à jour de la slide
			});
			this.dotsContainer.appendChild(dot);
		}
	}

	/**
	 * Fonction permettant l'affichage des fleches
	 */
	displayArrows() {
		// Création de la flèche gauche
		const arrow_left = document.createElement('img');
		arrow_left.classList.add('arrow');
		arrow_left.classList.add('arrow_left');
		arrow_left.style.cursor = 'pointer'; // Modification du curseur pour indicer que l'élément est cliquable
		arrow_left.src = './assets/images/arrow_left.png';
		// On rend la flèche cliquable avec un évènement
		arrow_left.addEventListener('click', () => {
			this.current_slide--;
			this.displayCurrentSlide(); // Mise à jour de la slide
		});
		this.banner_container.appendChild(arrow_left);

		// Création de la flèche droite
		const arrow_right = document.createElement('img');
		arrow_right.classList.add('arrow');
		arrow_right.classList.add('arrow_right');
		arrow_right.style.cursor = 'pointer'; // Modification du curseur pour indicer que l'élément est cliquable
		arrow_right.src = './assets/images/arrow_right.png';
		// On rend la flèche cliquable avec un évènement
		arrow_right.addEventListener('click', () => {
			this.current_slide++;
			this.displayCurrentSlide(); // Mise à jour de la slide
		});
		this.banner_container.appendChild(arrow_right);
	}

	/**
	 * Fonction permettant l'affichage de la slide actuelle
	 */
	displayCurrentSlide() {
		// Si position actuelle est supérieur au nombre de slide, on reset la position
		if (this.current_slide >= this.slides.length) { this.current_slide = 0; }
		// Si position actuelle est négative, on bascule à la dernière position
		if (this.current_slide < 0) { this.current_slide = (this.slides.length - 1); }

		for (let i = 0; i < this.slides.length; i++) {
			const slide = this.slides[i]; // Slide de la position actuelle dans le tableau
			const dot = document.getElementsByClassName('dot')[i]; // Dot de la position actuelle dans le tableau

			if (this.current_slide === i) {
				// Ajout d'un timeout pour un effet fade en reduisant l'opacité de l'image
				this.banner_img.style.opacity = '0.7';
				// On déclare un timeout pour que la durée de la proriété CSS soit respectée
				setTimeout(() => {
					this.banner_img.src = './assets/images/slideshow/' + slide.image
					this.banner_description.innerHTML = slide.tagLine;
					dot.classList.add('dot_selected');
					this.banner_img.style.opacity = '1';
				}, 300);
			} else {
				if (dot.classList.contains('dot_selected')) {
					dot.classList.remove('dot_selected');
				}
			}
		}
	}

	/**
	 * Fonction permettant l'affichage automatique des slides
	 */
	startInterval() {
		setInterval(() => {
			this.current_slide++;
			this.displayCurrentSlide(); // Mise à jour de la slide
		}, this.speed);
	}
}

// Une fois que le DOM est chargé, on lance le carousel.
window.addEventListener('DOMContentLoaded', () => {
	try {
		new Carousel(slides, 7000); // On lance le carousel
	} catch(err) { alert(err); } // On récupère une potentielle erreur
});