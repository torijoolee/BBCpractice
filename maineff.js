(() => {
  const stepElems = document.querySelectorAll(".step");
  const graphicElems = document.querySelectorAll(".graphic-item");
  let currentItem = graphicElems[0];

  for (let i = 0; i < stepElems.length; i++) {
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;

    // stepElems[i].setAttribute("data-index", i);
    // graphicElems[i].setAttribute("data-index", i);
  }
  function activate() {
    currentItem.classList.add("visible");
  }
  function inactivate() {
    currentItem.classList.remove("visible");
  }

  window.addEventListener("scroll", () => {
    let step;
    let boundingRect;

    for (let i = 0; i < stepElems.length; i++) {
      step = stepElems[i];
      boundingRect = step.getBoundingClientRect();
      if (
        boundingRect.top > window.innerHeight * 0.2 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        if (currentItem) {
          inactivate();
        }
        currentItem = graphicElems[step.dataset.index];
        activate();
      }
    }
  });
  activate();
})();
