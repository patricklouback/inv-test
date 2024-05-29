const createIframe = document.createElement("iframe");
(createIframe.id = "triple-ai-iframe"),
  (createIframe.src =
    "https://embedded.tripleai.com.br/#;HQc-OM6Ab_AvMbrvITmgR7woYRMA0Hg6oWmBp1LMSwA;#5159c3;Sou InnovaBot, seu guia da inovação;Olá! 👋 pergunte-me tudo sobre inovação."),
  (createIframe.style.zIndex = "9999999"),
  (createIframe.style.position = "fixed"),
  (createIframe.style.border = "none"),
  (createIframe.width = "90px"),
  (createIframe.style.bottom = "0px"),
  (createIframe.style.right = "0px");
const bodyElement = document.querySelector("body");
bodyElement.appendChild(createIframe),
  window.addEventListener("message", (e) => {
    if (e.data && e.data?.width && e.data?.height) {
      const { width: t, height: i } = e.data,
        a = document.querySelector("#triple-ai-iframe");
      (a.style.width = t), (a.width = t), (a.height = i);
    }
  });