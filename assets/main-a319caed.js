(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const header = {
  template: (
    // html
    `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div class="container">
    <a class="navbar-brand" href="#/home"
      ><img
        src="/assets/images/logo.svg"
        alt=""
        width="30"
        height="24"
        class="d-inline-block align-text-top"
      />

      Vanilla Games</a
    >
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#/home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#">TOP5 Proyectos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#">A cerca de</a>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="ms-2 btn btn-success" href="#/login">
            Iniciar sesión
            <i class="bi bi-box-arrow-in-right"></i>
          </a>
        </li>
        <li class="nav-item">
          <a class="ms-2 btn btn-outline-light" href="#/registro">
            Regístrate
            <i class="bi bi-box-arrow-in-right"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  `
  )
};
const footer = {
  template: (
    // html
    `
<nav class="navbar bg-secondary fixed-bottom small">
  <div class="container">
    <a class="navbar-brand" href="http://www.fpllefia.com">
      <img
        src="/assets/images/logo.svg"
        alt="fpllefia"
        width="30"
        height="24"
        class="d-inline-block align-text-top"
      />
      FPLlefià
    </a>
    <span class="navbar-text">@Texto de header</span>
    <a href="#" class="nav-link">Vínculo header</a>
  </div>
</nav>
  `
  )
};
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep, importerUrl);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i = links.length - 1; i >= 0; i--) {
        const link2 = links[i];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule()).catch((err) => {
    const e = new Event("vite:preloadError", { cancelable: true });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  });
};
const enrutador = {
  // Objeto (diccionario) con todas las rutas y su vista asociada
  rutas: {
    home: __vitePreload(() => import("./homeVista-37bdd10c.js"), true ? [] : void 0, import.meta.url),
    // Usuarios
    admin: __vitePreload(() => import("./adminVista-6fa0d0c6.js"), true ? [] : void 0, import.meta.url),
    registro: __vitePreload(() => import("./registroVista-09bcd755.js"), true ? [] : void 0, import.meta.url),
    login: __vitePreload(() => import("./loginVista-327898aa.js"), true ? [] : void 0, import.meta.url),
    // Proyectos
    proyectos: __vitePreload(() => import("./proyectosVista-86e20d87.js"), true ? [] : void 0, import.meta.url),
    proyectoNuevo: __vitePreload(() => import("./proyectoNuevoVista-1b893b1a.js"), true ? [] : void 0, import.meta.url),
    proyectoEditar: __vitePreload(() => import("./proyectoEditarVista-f853b123.js"), true ? [] : void 0, import.meta.url),
    proyectoDetalle: __vitePreload(() => import("./proyectoDetalleVista-480975a2.js"), true ? [] : void 0, import.meta.url),
    404: __vitePreload(() => import("./404-b09a7404.js"), true ? [] : void 0, import.meta.url)
  },
  // Método que obtiene la ruta del navegador
  router: async () => {
    const pathCompleto = window.location.hash;
    const path = pathCompleto.split("/")[1];
    const parametro = pathCompleto.split("/")[2];
    const componenteVista = await enrutador.rutas[path];
    if (componenteVista) {
      try {
        const vista = await componenteVista.default;
        document.querySelector("main").innerHTML = vista.template;
        vista.script(parametro);
      } catch (error) {
        console.log(error);
      }
    } else {
      window.location = "#/404";
    }
  },
  // Capturamos los eventos
  observadorRutas: () => {
    document.body.addEventListener("click", (event) => {
      const link = event.target;
      if (link.tagName === "A") {
        event.preventDefault();
        const href = link.getAttribute("href");
        window.history.pushState({ path: href }, "", href);
        enrutador.router();
      }
    });
    window.addEventListener("popstate", (e) => {
      console.log("evento popstate - Te estás moviendo por el historial");
      enrutador.router();
    });
  }
};
const styles = "";
document.querySelector("header").innerHTML = header.template;
document.querySelector("footer").innerHTML = footer.template;
enrutador.observadorRutas();
window.location = "#/home";
