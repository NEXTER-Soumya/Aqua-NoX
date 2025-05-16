let slideIndex = 1;
let autoSlide; // variable to store autoplay
const hamburger = document.getElementById("hamburger");
const closeIcon = document.getElementById("closeIcon");
const navLinks = document.getElementById("navLinks");

// Variables for touch swipe
let touchStartX = 0;
let touchEndX = 0;

// Variables for mouse drag
let isDragging = false;
let dragStartX = 0;
let dragEndX = 0;

hamburger.addEventListener("click", () => {
  navLinks.classList.add("nav-active");
  hamburger.style.display = "none";
  closeIcon.style.display = "block";
});

closeIcon.addEventListener("click", () => {
  navLinks.classList.remove("nav-active");
  closeIcon.style.display = "none";
  hamburger.style.display = "block";
});

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "flex";
}

function plusSlides(n) {
  slideIndex += n;
  showSlides(slideIndex);
  stopAutoSlide(); // stop autoplay on manual interaction
}

function autoPlaySlides() {
  slideIndex++;
  showSlides(slideIndex);
}

// Start autoplay
autoSlide = setInterval(autoPlaySlides, 4000); // change every 4 seconds

function stopAutoSlide() {
  clearInterval(autoSlide);
}

showSlides(slideIndex);
document.getElementById("year").textContent = new Date().getFullYear();

function sendWhatsAppMessage() {
  // Fetch inputs dynamically inside this function
  const contact = document.getElementById("popup-contact").value.trim();
  const message = document.getElementById("popup-message").value.trim();

  if (!contact || !message) {
    alert("Please fill out both contact and message fields.");
    return;
  }

  const phoneNumber = "91XXXXXXXXXX"; // Replace with business WhatsApp number
  const encodedMessage = encodeURIComponent(
    `Hello, I'm interested in your service.\n\nContact: ${contact}\nMessage: ${message}`
  );
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
}

function showPopup() {
  const popup = document.getElementById("contact-popup");
  if (popup) popup.style.display = "block";
}

function closePopup() {
  const popup = document.getElementById("contact-popup");
  popup.style.display = "none";
}

// Dismiss popup when clicking outside the card
document.addEventListener("click", function (event) {
  const popup = document.getElementById("contact-popup");
  if (!popup) return;

  // Close if visible and clicked outside the popup
  if (
    popup.style.display === "block" &&
    !popup.contains(event.target) &&
    !event.target.classList.contains("machine-contact-btn")
  ) {
    popup.style.display = "none";
  }
});

// ====== SWIPE & MOUSE DRAG LOGIC FOR SLIDESHOW ====== //

const slideshow = document.querySelector('.slideshow-container');

if (slideshow) {
  // Touch events
  slideshow.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slideshow.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });

  // Mouse events
  slideshow.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.screenX;
  });

  slideshow.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    dragEndX = e.screenX;
    handleMouseGesture();
  });

  slideshow.addEventListener('mouseleave', (e) => {
    // Cancel drag if mouse leaves container
    isDragging = false;
  });
}

function handleGesture() {
  const swipeDistance = touchEndX - touchStartX;
  const minSwipeDistance = 50; // Minimum px for swipe

  if (swipeDistance > minSwipeDistance) {
    // Swipe right: previous slide
    plusSlides(-1);
  } else if (swipeDistance < -minSwipeDistance) {
    // Swipe left: next slide
    plusSlides(1);
  }
}

function handleMouseGesture() {
  const dragDistance = dragEndX - dragStartX;
  const minDragDistance = 50; // Minimum px for drag

  if (dragDistance > minDragDistance) {
    plusSlides(-1);
  } else if (dragDistance < -minDragDistance) {
    plusSlides(1);
  }
}
