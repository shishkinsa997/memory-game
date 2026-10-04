import "@/styles/modal.scss";
import { el } from "@/js/utils/utils.js";

function renderModal({ name, title, content, button }) {
  const modal = el("dialog", {
    className: `${name} modal`,
    id: name,
  });
  const modalInner = el("div", {
    className: `modal-container ${name}-inner`,
  });
  const modalTitle = el("h2", {
    className: `modal-title ${name}-title`,
    text: title,
  });
  const modalCloseBtn = el("button", {
    className: "btn modal-btn ",
    text: "Close",
  });
  const btnContainer = el("div", {
    className: "modal-btn-container",
  });

  modalCloseBtn.addEventListener("click", () => {
    modal.close();
    document.documentElement.style = "overflow: auto";
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.close();
      document.documentElement.style = "overflow: auto";
    }
  });
  if (button) btnContainer.append(button, modalCloseBtn);
  btnContainer.append(modalCloseBtn);
  modalInner.append(modalTitle, ...content, btnContainer);
  modal.append(modalInner);

  return modal;
}

const showModal = (modal) => {
  modal.showModal();
  document.documentElement.style = "overflow: hidden";
};

export { renderModal, showModal };
