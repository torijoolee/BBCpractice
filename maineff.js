(() => {
  const actions = {
    birdFlies(key) {
      if (key) {
        document.querySelector(
          "[data-index ='2'] .bird"
        ).style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector(
          "[data-index ='2'] .bird"
        ).style.transform = `translateX(-100%)`;
      }
    },
  };

  const stepElems = document.querySelectorAll(".step");
  const graphicElems = document.querySelectorAll(".graphic-item");
  let currentItem = graphicElems[0];
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1;
    // console.log(ioIndex);
  });
  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);
    //모든 step을 관찰대상으로 등록
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  // stepElems[i].setAttribute("data-index", i);
  // graphicElems[i].setAttribute("data-index", i);

  function activate(action) {
    currentItem.classList.add("visible");
    if (action) {
      actions[action](true);
    }
  }
  function inactivate(action) {
    currentItem.classList.remove("visible");
    if (action) {
      actions[action](false);
    }
  }

  window.addEventListener("scroll", () => {
    let step;
    let boundingRect;

    // for (let i = 0; i < stepElems.length; i++)
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];
      if (!step) continue;
      boundingRect = step.getBoundingClientRect();

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.9
      ) {
        inactivate(currentItem.dataset.action);
        currentItem = graphicElems[step.dataset.index];
        activate(currentItem.dataset.action);
      }
    }
  });
  activate();
})();
