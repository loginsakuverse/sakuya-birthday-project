```javascript
/* =========================
   PAGE NAVIGATION
========================= */

function openPage(pageId) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}


/* =========================
   BACKGROUND MUSIC
========================= */

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

if (bgMusic && musicBtn) {

  // Âm lượng mặc định 50%
  bgMusic.volume = 0.5;


  // Cập nhật icon và hiệu ứng nút
  function updateMusicButton() {

    if (bgMusic.paused) {

      musicBtn.textContent = "🔇";
      musicBtn.classList.remove("playing");

    } else {

      musicBtn.textContent = "♫";
      musicBtn.classList.add("playing");

    }

  }


  // Thử tự phát nhạc khi mở website
  window.addEventListener("load", function () {

    bgMusic
      .play()
      .then(function () {

        updateMusicButton();

      })
      .catch(function () {

        // Browser chặn autoplay.
        // Nhạc sẽ được phát sau lần click đầu tiên.

      });

  });


  // Nút bật / tắt nhạc
  musicBtn.addEventListener("click", function (event) {

    // Không để click nút nhạc kích hoạt
    // các sự kiện click khác trên website
    event.stopPropagation();


    if (bgMusic.paused) {

      bgMusic
        .play()
        .then(function () {

          updateMusicButton();

        })
        .catch(function () {});

    } else {

      bgMusic.pause();

      updateMusicButton();

    }

  });


  // Nếu autoplay bị trình duyệt chặn,
  // click bất kỳ đâu trên website sẽ phát nhạc.
  function startMusicAfterInteraction() {

    if (bgMusic.paused) {

      bgMusic
        .play()
        .then(function () {

          updateMusicButton();

        })
        .catch(function () {});

    }

    document.removeEventListener(
      "click",
      startMusicAfterInteraction
    );

  }


  document.addEventListener(
    "click",
    startMusicAfterInteraction
  );

}


/* =========================
   PROJECT DATA
========================= */

const projects = {

  project1: {
    title: "Project Opening",

    images: [
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
    ]
  },


  project2: {
    title: "Project Stage 02",

    images: [
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
    ]
  },


  project3: {
    title: "Project Completed",

    images: [
      "https://images.unsplash.com/photo-1500534623283-312aade485b7",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205"
    ]
  }

};


/* =========================
   PROJECT GALLERY
========================= */

function openProjectGallery(projectId) {

  const project = projects[projectId];

  if (!project) return;

  document.getElementById("galleryTitle").textContent =
    project.title;

  const gallery =
    document.getElementById("projectGallery");

  gallery.innerHTML = "";


  project.images.forEach(imageUrl => {

    const img =
      document.createElement("img");

    img.src = imageUrl;

    img.className = "gallery-image";

    img.loading = "lazy";

    img.onclick = function() {

      openImageViewer(imageUrl);

    };

    gallery.appendChild(img);

  });


  openPage("projectGalleryPage");
}


/* =========================
   MESSAGE FORM
========================= */

let selectedImage = null;


function openMessageForm() {

  document
    .getElementById("messageModal")
    .classList
    .add("show");

}


function closeMessageForm() {

  document
    .getElementById("messageModal")
    .classList
    .remove("show");

}


/* =========================
   IMAGE PREVIEW
========================= */

function previewImage(event) {

  const file = event.target.files[0];

  if (!file) return;


  if (!file.type.startsWith("image/")) {

    alert("Please choose an image.");

    return;

  }


  selectedImage = file;


  const reader =
    new FileReader();


  reader.onload = function(e) {

    const preview =
      document.getElementById("imagePreview");

    preview.src = e.target.result;

    preview.style.display = "block";


    document
      .getElementById("uploadContent")
      .style.display = "none";

  };


  reader.readAsDataURL(file);

}


/* =========================
   SUBMIT MESSAGE
========================= */

function submitMessage() {

  const name =
    document
      .getElementById("nameInput")
      .value
      .trim();


  const message =
    document
      .getElementById("messageInput")
      .value
      .trim();


  if (!selectedImage) {

    alert("Please upload a photo ♡");

    return;

  }


  if (!name) {

    alert("Please enter your name.");

    return;

  }


  if (!message) {

    alert("Please write a message.");

    return;

  }


  const reader =
    new FileReader();


  reader.onload = function(e) {

    const data = {

      name: name,

      message: message,

      image: e.target.result,

      date: new Date().toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        }
      )

    };


    addMessageToPage(data);

    closeMessageForm();

    resetForm();

  };


  reader.readAsDataURL(selectedImage);

}


/* =========================
   ADD MESSAGE
========================= */

function addMessageToPage(data) {

  const list =
    document.getElementById("messageList");


  const card =
    document.createElement("article");


  card.className =
    "message-card-item";


  card.innerHTML = `

    <img
      class="message-photo"
      src="${data.image}"
      alt="Memory photo"
    >

    <div class="message-content">

      <div class="message-name">
        From. ${escapeHTML(data.name)}
      </div>

      <div class="message-text">
        ${escapeHTML(data.message)}
      </div>

      <div class="message-date">
        ${data.date}
      </div>

    </div>

  `;


  card
    .querySelector(".message-photo")
    .onclick = function() {

      openImageViewer(data.image);

    };


  list.prepend(card);

}


/* =========================
   RESET FORM
========================= */

function resetForm() {

  selectedImage = null;


  document.getElementById(
    "photoInput"
  ).value = "";


  document.getElementById(
    "nameInput"
  ).value = "";


  document.getElementById(
    "messageInput"
  ).value = "";


  document.getElementById(
    "imagePreview"
  ).src = "";


  document.getElementById(
    "imagePreview"
  ).style.display = "none";


  document.getElementById(
    "uploadContent"
  ).style.display = "block";

}


/* =========================
   IMAGE VIEWER
========================= */

function openImageViewer(image) {

  document.getElementById(
    "viewerImage"
  ).src = image;


  document.getElementById(
    "imageViewer"
  )
  .classList
  .add("show");

}


function closeImageViewer() {

  document.getElementById(
    "imageViewer"
  )
  .classList
  .remove("show");

}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}


/* =========================
   YEAR 2026
========================= */

function toggleYear2026() {

  const content =
    document.getElementById(
      "year2026Content"
    );


  if (content) {

    content.classList.toggle("show");

  }

}
```
