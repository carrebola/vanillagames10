const homeVista = {
  template: (
    // html
    `
<div class="container">
  <h1 class="mt-5 text-center fw-bold" style="font-size: 100px">
    Vanilla Games
  </h1>
  <div class="m-5 mx-auto" style="max-width: 400px">
    <img src="/assets/images/logo.svg" alt="fpllefia" class="img-fluid" />
  </div>
</div>
  `
  ),
  script: () => {
    console.log("Vista home cargada");
  }
};
export {
  homeVista as default
};
