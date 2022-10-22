import "./css/index.css";
import Imask from "imask";

const ccBgColor01 = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) path"
);
const ccBgColor02 = document.querySelector(
  ".cc-bg svg > g g:nth-child(2) path"
);
const cclogo = document.querySelector(".cc-logo span:nth-child(2) img");

function setCard(type) {
  const colors = {
    visa: ["#433D99", "#2D57f2"],
    mastercard: ["#DFF6F29", "#C69347"],
    default: ["black", "gray"],
  };
  ccBgColor01.setAttribute("fill", colors[type][0]);
  ccBgColor02.setAttribute("fill", colors[type][1]);
  cclogo.setAttribute("src", `cc-${type}.svg`);
}

globalThis.setCard = setCard;

const securtyCode = document.querySelector("#security-code");

const securtyCodePattern = {
  mask: "0000",
};

const securtyCodeMasked = Imask(securtyCode, securtyCodePattern);

const expirationDate = document.querySelector("#expiration-date");

const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: Imask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: Imask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
};

const expirationDateMasked = Imask(expirationDate, expirationDatePattern);

const cardNumber = document.querySelector("#card-number");
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "");
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex);
    });
    console.log(foundMask);
    return foundMask;
  },
};
const CardNumberMasked = IMask(cardNumber, cardNumberPattern);

const adButton = document.querySelector("#ad-card");

adButton.addEventListener("click", () => {
  alert("cartão adiocionado com sucesso!");
});

document.querySelector("form").addEventListener("submit", (Event) => {
  Event.preventDefault();
});

const cardHolder = document.querySelector("#card-holder");
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText = cardHolder.value.length === 0 ? 
  "Fulano da Silva" : cardHolder.value;
});

securtyCodeMasked.on("accept", ()=>{
updateSecurityCode(securtyCodeMasked.value);
})

function updateSecurityCode(code){
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? "123" : code

}

CardNumberMasked.on("accept", ()=>{
updateCardNumber(CardNumberMasked.value)
})

function updateCardNumber(number){
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ?  "1234 5678 9012 3456" : number
}