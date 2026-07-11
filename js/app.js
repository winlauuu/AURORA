const beginButton = document.getElementById("beginButton");
const landingPage = document.getElementById("landingPage");
const homePage = document.getElementById("homePage");

const themeSong = document.getElementById("themeSong");
const musicToggle = document.getElementById("musicToggle");

const menuCards = document.querySelectorAll("[data-page]");
const contentPages = document.querySelectorAll(".content-page");
const backButtons = document.querySelectorAll(".back-button");

/* TOMBOL BEGIN */
if (beginButton && landingPage && homePage) {
    beginButton.addEventListener("click", () => {

        /* Mulai musik setelah pengguna menekan Begin */
        if (themeSong) {
            themeSong.volume = 0.3;

            themeSong.play().catch((error) => {
                console.log("Musik tidak dapat diputar:", error);
            });
        }

        landingPage.classList.add("fade-out");

        setTimeout(() => {
            landingPage.style.display = "none";
            homePage.classList.add("active");
            document.body.style.overflow = "auto";
            window.scrollTo(0, 0);
        }, 650);
    });
}

/* MEMBUKA MENU */
menuCards.forEach((card) => {
    card.addEventListener("click", () => {
        const targetPageId = card.dataset.page;
        const targetPage = document.getElementById(targetPageId);

        if (!targetPage) {
            return;
        }

        homePage.classList.remove("active");

        contentPages.forEach((page) => {
            page.classList.remove("active");
        });

        targetPage.classList.add("active");
        window.scrollTo(0, 0);
    });
});

/* TOMBOL KEMBALI */
backButtons.forEach((button) => {
    button.addEventListener("click", () => {
        contentPages.forEach((page) => {
            page.classList.remove("active");
        });

        homePage.classList.add("active");
        window.scrollTo(0, 0);
    });
});

/* SAPAAN OTOMATIS */
const greetingText = document.getElementById("greetingText");

function updateGreeting() {
    if (!greetingText) {
        return;
    }

    const currentHour = new Date().getHours();
    let greeting = "Good Morning";

    if (currentHour >= 12 && currentHour < 15) {
        greeting = "Good Afternoon";
    } else if (currentHour >= 15 && currentHour < 19) {
        greeting = "Good Evening";
    } else if (currentHour >= 19 || currentHour < 5) {
        greeting = "Good Night";
    }

    greetingText.textContent = `${greeting}, Richard`;
}

updateGreeting();

/* PLAY / PAUSE MUSIK */
if (musicToggle && themeSong) {
    musicToggle.addEventListener("click", () => {
        if (themeSong.paused) {
            themeSong.play();
            musicToggle.textContent = "🎵";
        } else {
            themeSong.pause();
            musicToggle.textContent = "🔇";
        }
    });
}
/* ===== LETTER MODAL ===== */

const letterCards = document.querySelectorAll(".letter-card");
const letterModal = document.getElementById("letterModal");
const letterModalTitle = document.getElementById("letterModalTitle");
const letterModalContent = document.getElementById("letterModalContent");
const letterModalClose = document.getElementById("letterModalClose");

if (
    letterCards.length > 0 &&
    letterModal &&
    letterModalTitle &&
    letterModalContent &&
    letterModalClose
) {
    letterCards.forEach((card) => {
        card.addEventListener("click", () => {
            letterModalTitle.textContent =
                card.getAttribute("data-letter-title") || "A Letter for You";

            letterModalContent.textContent =
                card.getAttribute("data-letter-content") || "";

            letterModal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    function closeLetterModal() {
        letterModal.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    letterModalClose.addEventListener("click", closeLetterModal);

    letterModal.addEventListener("click", (event) => {
        if (event.target === letterModal) {
            closeLetterModal();
        }
    });
}
/* ===== RELATIONSHIP COUNTER ===== */

const relationshipDays = document.getElementById("daysTogether");

if (relationshipDays) {

    const firstDay = new Date("2024-08-19");

    const today = new Date();

    const diffTime = today - firstDay;

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    relationshipDays.textContent = diffDays;

}
/* ===== FEELINGS MODAL ===== */

const feelingCards = document.querySelectorAll(".feeling-card");
const feelingModal = document.getElementById("feelingModal");
const feelingModalTitle = document.getElementById("feelingModalTitle");
const feelingModalMessage = document.getElementById("feelingModalMessage");
const feelingModalClose = document.getElementById("feelingModalClose");

if (
    feelingCards.length > 0 &&
    feelingModal &&
    feelingModalTitle &&
    feelingModalMessage &&
    feelingModalClose
) {

    feelingCards.forEach((card) => {

        card.addEventListener("click", () => {

            feelingModalTitle.textContent =
                card.dataset.feelingTitle;

            feelingModalMessage.textContent =
                card.dataset.feelingMessage;

            feelingModal.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });

    function closeFeelingModal() {

        feelingModal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

    feelingModalClose.addEventListener("click", closeFeelingModal);

    feelingModal.addEventListener("click", (event) => {

        if (event.target === feelingModal) {

            closeFeelingModal();

        }

    });

}
/* ===== SECRET SCENES ===== */

const secretNextButtons = document.querySelectorAll(".secret-next");
const secretScenes = document.querySelectorAll(".secret-scene");
const secretBackHome = document.getElementById("secretBackHome");
const secretVideo = document.getElementById("secretVideo");

secretNextButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const currentScene = button.closest(".secret-scene");
        const nextSceneId = button.dataset.next;
        const nextScene = document.getElementById(nextSceneId);

        if (!currentScene || !nextScene) {
            return;
        }

        currentScene.classList.remove("active");
        nextScene.classList.add("active");

        if (nextSceneId === "secretScene3" && themeSong) {
            themeSong.pause();
            musicToggle.textContent = "🔇";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

if (secretBackHome) {
    secretBackHome.addEventListener("click", () => {
        secretScenes.forEach((scene) => {
            scene.classList.remove("active");
        });

        const firstScene = document.getElementById("secretScene1");

        if (firstScene) {
            firstScene.classList.add("active");
        }

        if (secretVideo) {
            secretVideo.pause();
            secretVideo.currentTime = 0;
        }

        contentPages.forEach((page) => {
            page.classList.remove("active");
        });

        homePage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
/* ===== IMAGE LIGHTBOX ===== */

const momentCards = document.querySelectorAll(".moment-card");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const modalClose = document.getElementById("modalClose");

if (
    momentCards.length > 0 &&
    imageModal &&
    modalImage &&
    modalCaption &&
    modalClose
) {

    momentCards.forEach((card) => {

        card.addEventListener("click", () => {

            const image = card.querySelector("img");
            const caption = card.querySelector("span");

            modalImage.src = image.src;
            modalImage.alt = image.alt;

            modalCaption.textContent = caption.textContent;

            imageModal.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });

    function closeImageModal() {

        imageModal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

    modalClose.addEventListener("click", closeImageModal);

    imageModal.addEventListener("click", (event) => {

        if (event.target === imageModal) {

            closeImageModal();

        }

    });

}
