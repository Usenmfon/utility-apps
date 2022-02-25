const mtn_numbers = document.getElementById("mtn_numbers");
const airtel_numbers = document.getElementById("airtel_numbers");
const glo_numbers = document.getElementById("glo_numbers");
const nine_mobile_numbers = document.getElementById("nine_mobile_numbers");
const search = document.getElementById("search");
const network_name = document.getElementsByClassName("network_name")[0];

search.addEventListener("input", (e) => {
  let value = e.target.value;
  if (['0803', '0806', '0703', '0706', '0813', '0816', '0810', '0814', '0903'].includes(value)) {
    network_name.innerHTML = "MTN";
  }
  if (['0802', '0808', '0708', '0812', '0701', '0902',].includes(value)) {
    network_name.innerHTML = "AIRTEL";
  }
  if (['0805','0807','0705','0815','0811','0905',].includes(value)) {
    network_name.innerHTML = "GLO";
  }
  if (['0809','0818','0817','0909'].includes(value)) {
    network_name.innerHTML = "9MOBILE";
  }
});

const handleClick = (network) => {
  console.log("clicked", network);
  switch (network) {
    case "MTN":
      changeDisplay(mtn_numbers);
      break;
    case "AIRTEL":
      changeDisplay(airtel_numbers);
      break;
    case "GLO":
      changeDisplay(glo_numbers);
      break;
    case "NINEMOBILE":
      changeDisplay(nine_mobile_numbers);
      break;
    default:
      break;
  }
};

function changeDisplay(network) {
  if (network.style.display === "block") {
    network.style.display = "none";
  } else {
    network.style.display = "block";
  }
}
