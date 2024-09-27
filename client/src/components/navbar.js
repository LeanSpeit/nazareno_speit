import Logo from "../assets/website/coffee_logo.png";

const menuList = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Services",
    link: "/#services",
  },
];

// Mapea el array de menús para crear una lista de elementos <li> con enlaces <a>
const menues = menuList.map((menu) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = menu.link;
  a.className = "inline-block px-4 py-4 text-xl duration-200 text-white/70 hover:text-white";
  a.textContent = menu.name;
  li.appendChild(a);
  return li;
});

function createUserAvatar(username, avatarUrl = null) {
  const userDiv = document.createElement("div");
  userDiv.className = "flex items-center gap-2";

  let avatarElement;
  if (avatarUrl) {
    avatarElement = document.createElement("img");
    avatarElement.src = avatarUrl;
    avatarElement.alt = `${username}'s avatar`;
    avatarElement.className = "w-8 h-8 rounded-full";
  } else {
    avatarElement = document.createElement("div");
    avatarElement.className = "flex items-center justify-center w-8 h-8 text-white bg-gray-500 rounded-full";
    avatarElement.textContent = username.charAt(0).toUpperCase();
  }

  const usernameSpan = document.createElement("span");
  usernameSpan.textContent = username;
  usernameSpan.className = "text-xl text-white/70";

  userDiv.appendChild(avatarElement);
  userDiv.appendChild(usernameSpan);

  return userDiv;
}

export function navbar(session = null) {
  const navbarDiv = document.createElement("div");
  navbarDiv.className = "text-white bg-gray-900 shadow-md bg-gradient-to-r from-secondary to-secondary/90";

  const containerDiv = document.createElement("div");
  containerDiv.className = "container py-2";

  const flexDiv = document.createElement("div");
  flexDiv.className = "flex items-center justify-between";

  const logoDiv = document.createElement("div");
  logoDiv.setAttribute("data-aos", "fade-down");
  logoDiv.setAttribute("data-aos-once", "true");

  const logoLink = document.createElement("a");
  logoLink.href = "#";
  logoLink.className = "flex items-center justify-center gap-2 text-2xl font-bold tracking-wider sm:text-3xl font-cursive";

  const logoImg = document.createElement("img");
  logoImg.src = Logo;
  logoImg.alt = "Logo";
  logoImg.className = "w-14";

  const logoText = document.createTextNode("Che Coffee");
  logoLink.appendChild(logoImg);
  logoLink.appendChild(logoText);
  logoDiv.appendChild(logoLink);

  const menuDiv = document.createElement("div");
  menuDiv.setAttribute("data-aos", "fade-down");
  menuDiv.setAttribute("data-aos-once", "true");
  menuDiv.setAttribute("data-aos-delay", "300");
  menuDiv.className = "flex items-center justify-between gap-4";

  const menuUl = document.createElement("ul");
  menuUl.className = "items-center justify-center hidden gap-4 sm:flex";
  menues.map((e) => {
    menuUl.appendChild(e);
  });

  const orderButton = document.createElement("button");
  orderButton.className = "flex items-center gap-3 px-4 py-2 text-white duration-200 rounded-full bg-primary/70 hover:scale-105";
  orderButton.textContent = "Orders";
  orderButton.addEventListener("click", () => {
    window.location.href = "/pages/orders.html";
  });

  menuDiv.appendChild(menuUl);
  menuDiv.appendChild(orderButton);

  if (session) {
    const avatar = createUserAvatar(session.user.username, session.user.avatarUrl);
    menuDiv.appendChild(avatar);

    const logoutButton = document.createElement("button");
    logoutButton.className = "px-4 py-2 text-white duration-200 rounded-full bg-primary/70 hover:scale-105";
    logoutButton.textContent = "Logout";

    logoutButton.addEventListener("click", async () => {
      await fetch("http://localhost:4321/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/pages/login.html"; // Redirigir al login
    });

    menuDiv.appendChild(logoutButton);
  } else {
    const loginButton = document.createElement("button");
    loginButton.className = "px-4 py-2 text-white duration-200 rounded-full bg-primary/70 hover:scale-105";
    loginButton.textContent = "Login";

    loginButton.addEventListener("click", () => {
      window.location.href = "/pages/login.html";
    });

    menuDiv.appendChild(loginButton);
  }

  flexDiv.appendChild(logoDiv);
  flexDiv.appendChild(menuDiv);
  containerDiv.appendChild(flexDiv);
  navbarDiv.appendChild(containerDiv);

  return navbarDiv;
}
