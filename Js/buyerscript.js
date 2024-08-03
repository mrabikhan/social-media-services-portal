let total=0;
var quant = document.getElementById('qunt');
quant.oninput = () => {
  var quant = document.getElementById('qunt').value;
  let amt = document.getElementById('amount');
  total = parseInt(quant) * 0.029;
  amt.innerHTML = parseFloat(total).toFixed(2);
}


const SubmitService=async (e)=>{

  

  let Title=document.getElementById("Services").value;
  let Links= document.getElementById("link").value;
  let Quantity = document.getElementById("qunt").value;
  const Service = {
    Title:Title,
    Links:Links,
    Quantity:Quantity,
    Amount:total,
    token:localStorage.getItem("token")
  }
  const response = await fetch("http://localhost:5000/api/Service/AddService", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body:JSON.stringify(Service)
	})

}

