(function () {
  const navHost = document.querySelector(".site-header");
  if (!navHost) {
    return;
  }

  const cssLink = document.querySelector('link[rel="stylesheet"][href$="site.css"]');
  const cssHref = cssLink ? cssLink.getAttribute("href") : "assets/site.css";
  const normalizedHref = cssHref.replace(/\/+/g, "/");

  const deriveBasePath = (href) => {
    const trimmed = href.replace(/[?#].*$/, "");
    if (!trimmed.endsWith("site.css")) {
      return ".";
    }

    const assetsPrefix = trimmed.replace(/site\.css$/, "").replace(/\/+$/, "");
    if (assetsPrefix === "assets" || assetsPrefix === "./assets") {
      return ".";
    }

    if (assetsPrefix.endsWith("/assets")) {
      return assetsPrefix.slice(0, -"/assets".length) || ".";
    }

    return ".";
  };

  const basePath = deriveBasePath(normalizedHref);
  const resolve = (relativePath) => {
    return `${basePath}/${relativePath}`;
  };

  const navItems = [
    { key: "index", href: resolve("index.html"), label: "Home" },
    { key: "people", href: resolve("people/index.html"), label: "People" },
    { key: "research", href: resolve("research/index.html"), label: "Research" },
    { key: "publications", href: resolve("publication/index.html"), label: "Publications" },
    { key: "resource", href: resolve("resource/index.html"), label: "Resources" },
  ];

  const getPathPage = () => {
    const pathname = window.location.pathname.replace(/[?#].*$/, "").replace(/\/+$/, "");

    if (!pathname || pathname.endsWith("/index.html")) {
      return "index";
    }

    if (pathname.endsWith("/")) {
      const trimmed = pathname.slice(0, -1);
      if (!trimmed) {
        return "index";
      }

      const parts = trimmed.split("/");
      return parts[parts.length - 1] || "index";
    }

    const lastSegment = pathname.split("/").filter(Boolean).pop();
    if (!lastSegment || lastSegment === "index.html") {
      return "index";
    }

    const withoutExt = lastSegment.replace(/\.html$/, "");
    return withoutExt || "index";
  };

  const getActiveKey = () => {
    const bodyPage = (document.body && document.body.getAttribute("data-page")) || "";
    const map = {
      home: "index",
      fundings: "fundings",
      funding: "fundings",
      publication: "publications",
      publications: "publications",
    };
    const page = (bodyPage || getPathPage()).toLowerCase();
    return map[page] || page;
  };

  const activeKey = getActiveKey();
  const logoPath = `${basePath}/assets/LU%20-%20Logo%20-%20Reversed%20_RGB_.png`;

  const linksHtml = navItems
    .map((item) => {
      const currentAttr = item.key === activeKey ? ' aria-current="page"' : "";
      return `<a href="${item.href}"${currentAttr}>${item.label}</a>`;
    })
    .join("");

  navHost.innerHTML = `
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="${resolve("index.html")}" aria-label="Multimodal Perception and Intelligence Learning Lab home">
        Multimodal Perception and Intelligence Learning Lab
      </a>
      <div class="nav-links">${linksHtml}</div>
      <a class="lancaster-logo" href="https://www.lancaster.ac.uk/" aria-label="Lancaster University home">
        <img src="${logoPath}" alt="Lancaster University">
      </a>
    </nav>
  `;
})();
