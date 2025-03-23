
let url = "https://frosted-brawny-droplet.glitch.me/db.jsonc"

let input_id = document.getElementById("id")
let input_title = document.getElementById("title")
let input_price = document.getElementById("price")
let input_description = document.getElementById("description")
let btn = document.getElementById("btn")

//adding fucnitonally to button by addEventListener()

btn.addEventListener("click" , async function (){
    if( input_title.value == "" || input_price.value == "" || input_description.value == ""){
        alert("Enter the detail")
    }
    else{
        let method = (input_id.value !=="")?"PUT" : "POST"
        let urll = (method === "PUT")? `${url}/${input_id.value}`: `${url}`

        try{
            let res = await fetch(urll,{
                 method,
                "headers" : {
                    "Content-Type" :"application/json"
                },
                "body" :JSON.stringify({
                    "title" : input_title.value,
                    "price" : input_price.value,
                    "description" : input_description.value
                })
         })
         if(!res.ok){
            throw "upadation error"
         }
        let data = await res.json();    
         getData()
         alert(method === "PUT" ? "Data Updated" : "Data Added");

         input_id.value =""
         input_price.value = ""
         input_title.value = ""
         input_description.value = ""
        }
        catch(err){
            console.error(err)
        }



    }
    
    
    })

// getting the data from json server
async function getData(){
    try{
        let res = await fetch(url);
        let data = await res.json();
        if(!res.ok){
            throw "something is fishy" // throw new Error ("something is fishy")
        }
        console.log(data);
        displayData(data)
    
    }catch(err){
        console.error(err); // console.error(err.message)
    }
}
//display the data
let container_2 = document.getElementById ('container_2')

function displayData(data){

    // container_2.innerHTML = "";
    data.forEach(obj => {
        let item = document.createElement("div")
        item.className="item"
        item.innerHTML=`
        <p class="title">Title : ${obj.title}</p>
        <p class="price" >Price : ${obj.price}</p>
        <p class="description" >Description : ${obj.description}</p>
        <button onclick="deleteOn('${obj.id}')">Delete</button>
        <button onclick="updateOn('${obj.id}')">Upadate</button>
        `;

        container_2.appendChild(item);

    });
}
//updating into input tags

async function updateOn(id) {
    try{
        let res = await fetch(`${url}/${id}`)
        if(!res.ok){
            throw "updating error"
        }
        let obj = await res.json();

        input_id.value = obj.id
        input_title.value = obj.title
        input_price.value =  obj.price
        input_description.value = obj.description

    }catch(err){
        console.error(err)
    }
    
}

// deleting the data

async function deleteOn(id){
    try{
        let res = await fetch(`${url}/${id}` , {
            "method" : "DELETE"
        })
        if(!res.ok){
            throw "error occured while deleting"
        }
        getData()
    }catch(err){
        console.error(err)
    }

}



 getData()


