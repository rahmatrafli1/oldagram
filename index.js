const posts = [
  {
    id: 1,
    username: "vincey1853",
    displayName: "Vincent van Gogh",
    location: "Zudert, Netherlands",
    avatar: "/images/avatar-vangogh.jpg",
    image: "/images/post-vangogh.jpg",
    likes: 21,
    caption: "just took a few mushrooms lol",
    liked: false,
  },
  {
    id: 2,
    username: "gus1819",
    displayName: "Gustave Courbet",
    location: "Ornans, France",
    avatar: "/images/avatar-courbet.jpg",
    image: "/images/post-courbet.jpg",
    likes: 4,
    caption: "i'm feelin a bit stressed tbh",
    liked: false,
  },
  {
    id: 3,
    username: "jd1735",
    displayName: "Joseph Ducreux",
    location: "Paris, France",
    avatar: "/images/avatar-ducreux.jpg",
    image: "/images/post-ducreux.jpg",
    likes: 152,
    caption:
      "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    liked: false,
  },
];

// ===== RENDER POSTS =====
function renderPosts() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach((post) => {
    const article = document.createElement("article");
    article.classList.add("post");
    article.dataset.id = post.id;

    article.innerHTML = `
            <header class="post-header">
                <img src="${post.avatar}" alt="${post.displayName}" class="post-avatar"
                    onerror="this.src='https://placehold.co/42x42/ccc/333?text=${post.displayName.charAt(0)}'">
                <div class="post-user-info">
                    <span class="post-username">${post.displayName}</span>
                    <span class="post-location">${post.location}</span>
                </div>
            </header>

            <div class="post-image-wrapper">
                <img 
                    src="${post.image}" 
                    alt="Post by ${post.displayName}" 
                    class="post-image"
                    onerror="this.src='https://placehold.co/470x470/eee/333?text=Image+Not+Found'"
                >
            </div>

            <div class="post-actions">
                <button class="action-btn like-btn ${post.liked ? "liked" : ""}" aria-label="Like">
                    <i class="${post.liked ? "fa-solid" : "fa-regular"} fa-heart"></i>
                </button>
                <button class="action-btn comment-btn" aria-label="Comment">
                    <i class="fa-regular fa-comment"></i>
                </button>
                <button class="action-btn share-btn" aria-label="Share">
                    <i class="fa-regular fa-paper-plane"></i>
                </button>
            </div>

            <p class="post-likes">${post.likes.toLocaleString()} likes</p>

            <p class="post-caption">
                <strong>${post.username}</strong> ${post.caption}
            </p>
        `;

    // Double click image = increase likes
    const imgWrapper = article.querySelector(".post-image-wrapper");
    imgWrapper.addEventListener("dblclick", () => handleDoubleLike(post.id));

    // Click like button
    const likeBtn = article.querySelector(".like-btn");
    likeBtn.addEventListener("click", () => toggleLike(post.id));

    feed.appendChild(article);
  });
}

// ===== TOGGLE LIKE =====
function toggleLike(postId) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderPosts();
}

// ===== DOUBLE CLICK = INCREASE LIKES =====
function handleDoubleLike(postId) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  if (!post.liked) {
    post.liked = true;
    post.likes += 1;
    renderPosts();
    showHeartAnimation(postId);
  }
}

// ===== HEART ANIMATION =====
function showHeartAnimation(postId) {
  const article = document.querySelector(`[data-id="${postId}"]`);
  const wrapper = article.querySelector(".post-image-wrapper");

  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.style.cssText = `
        position: absolute;
        font-size: 5rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: heartPop 0.8s ease forwards;
        pointer-events: none;
        z-index: 10;
    `;

  wrapper.style.position = "relative";
  wrapper.appendChild(heart);
  setTimeout(() => heart.remove(), 800);
}

// ===== INIT =====
renderPosts();
