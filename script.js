/* =========================
   PAGE NAVIGATION
========================= */

function openPage(pageId) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}


/* =========================
   EVENT DATA
========================= */

const events = {

  event1: {
    title: "Event Name",
    images: [
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
    ]
  },

  event2: {
    title: "Event Name",
    images: [
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
    ]
  }

};


/* =========================
   OPEN EVENT
========================= */

function openEvent(eventId) {

  const event = events[eventId];

  document.getElementById("eventTitle").textContent = event.title;

  const gallery = document.getElementById("eventGallery");

  gallery.innerHTML = "";

  event.images.forEach(image => {

    const img = document.createElement("img");

    img.src = image;

    img.className = "gallery-item";

    img.onclick = function() {
      openImageViewer(image);
    };

    gallery.appendChild(img);

  });

  openPage("eventDetailPage");
}


/* =========================
   MESSAGE FORM
========================= */

function openMessageForm() {

  document.getElementById("messageModal").classList.add("show");

}


function closeMessageForm() {

  document.getElementById("messageModal").classList.remove("show");

}


/* =========================
   IMAGE PREVIEW
========================= */

let selectedImage = null;

function previewImage(event) {

  const file = event.target.files[0];

  if (!file) return;

  selectedImage = file;

  const reader = new FileReader();

  reader.onload = function(e) {

    const preview = document.getElementById("imagePreview");

    preview.src = e.target.result;

    preview.style.display = "block";

    document.getElementById("uploadContent").style.display = "none";

  };

  reader.readAsDataURL(file);

}


/* =========================
   SUBMIT MESSAGE
========================= */

function submitMessage() {

  const name =
    document.getElementById("nameInput").value.trim();

  const message =
    document.getElementById("messageInput").value.trim();


  if (!selectedImage) {

    alert("Please choose a photo ♡");

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


  /*
    TEMPORARY VERSION

    Later this function will upload:
    1. Image → Supabase Storage
    2. Name + message + image URL → Supabase Database
  */


  const reader = new FileReader();

  reader.onload = function(e) {

    const newMessage = {

      name: name,

      message: message,

      image: e.target.result,

      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })

    };


    addMessageToPage(newMessage);

    closeMessageForm();

    resetForm();

  };

  reader.readAsDataURL(selectedImage);

}


/* =========================
   ADD MESSAGE TO PAGE
========================= */

function addMessageToPage(data) {

  const list = document.getElementById("messageList");


  const card = document.createElement("article");

  card.className = "message-card-item";


  card.innerHTML = `

    <img
      class="message-photo"
      src="${data.image}"
      alt="Message photo"
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


  const image = card.querySelector(".message-photo");

  image.onclick = function() {

    openImageViewer(data.image);

  };


  list.prepend(card);

}


/* =========================
   RESET FORM
========================= */

function resetForm() {

  selectedImage = null;

  document.getElementById("photoInput").value = "";

  document.getElementById("nameInput").value = "";

  document.getElementById("messageInput").value = "";

  document.getElementById("imagePreview").src = "";

  document.getElementById("imagePreview").style.display = "none";

  document.getElementById("uploadContent").style.display = "block";

}


/* =========================
   IMAGE VIEWER
========================= */

function openImageViewer(image) {

  document.getElementById("viewerImage").src = image;

  document.getElementById("imageViewer").classList.add("show");

}


function closeImageViewer() {

  document.getElementById("imageViewer").classList.remove("show");

}


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}
