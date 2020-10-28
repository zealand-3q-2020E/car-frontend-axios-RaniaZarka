import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

import { ICar } from "./Icar";

let carWebUrl: string = "https://webapicar20190326034339.azurewebsites.net/api/cars/";
let List:HTMLOListElement=<HTMLOListElement>document.getElementById("cars");
let GetAllCarsButton: HTMLButtonElement =<HTMLButtonElement> document.getElementById("ShowCars");

GetAllCarsButton.addEventListener('click', GetAllCars );

    function GetAllCars(): void{

    axios.get(carWebUrl)
    .then( function( response : AxiosResponse<ICar[]>): void
    {
       console.log(response)
      while (List.firstChild) {
        List.removeChild(List.lastChild);
      }
      response.data.forEach((car:ICar) => {
         let newNode :HTMLLIElement = AddLiElement(car.model +"" + car.price +"" +car.vendor +"" + car.id +"")
          List.appendChild(newNode);
        })
    })
    .catch( function (error: AxiosError ):  void {
        console.log(error)
    })
}
function AddLiElement(text:string):HTMLLIElement{

    let newLi :HTMLLIElement = document.createElement('li');
    let newTextNode : Text = document.createTextNode(text);
    newLi.appendChild(newTextNode);
    return newLi;
}


let oneCar:HTMLOListElement=<HTMLOListElement>document.getElementById("oneCar");

function getOne():void{
    let inputID : HTMLInputElement =<HTMLInputElement> document.getElementById("ID");
    let theCarID : number = +inputID.value;
      console.log("in the getone function")
      console.log("the car iD" + theCarID)
    axios.get(carWebUrl  + theCarID)
    .then( function( response : AxiosResponse<ICar>): void
    {
      console.log(response.data)
      let theCar:ICar = response.data;

    //   while (List.firstChild) {
    //     //List.removeChild(List.lastChild);
    //   }
    //   response.data.forEach((car:ICar) => {
         let newNode :HTMLLIElement = AddLiElement(theCar.model +"" + theCar.price +"" +theCar.vendor +"" + theCar.id +"");
         console.log("one car" + newNode);
           oneCar.appendChild(newNode);
    //     })
    })
    .catch( function (error: AxiosError ):  void {
        console.log(error)
    })

}
        let addcarButton: HTMLButtonElement =<HTMLButtonElement> document.getElementById("Add");
        addcarButton.addEventListener('click', addCar);

        function addCar():void{
          let addVendor: HTMLInputElement=<HTMLInputElement>document.getElementById('vendor');
          let addModel: HTMLInputElement =<HTMLInputElement> document.getElementById('model');
          let addPrice: HTMLInputElement=<HTMLInputElement> document.getElementById('price');

          let theVendor : string = addVendor.value;
          let theModel :string = addModel.value;
          let thePrice: number = +addPrice.value;
          
          axios.post<ICar>(carWebUrl, {vendor:theVendor, model :theModel, price:thePrice})
          .then(function(response: AxiosResponse) : void{
              console.log("status code is " + response.status);
              let text: HTMLHeadElement =<HTMLHeadElement> document.getElementById('added');
              text.innerHTML= "Car added";

              
          } )
          .catch(function(error :AxiosError): void{
              console.log(error)
          })

        }

        let deleteButton: HTMLButtonElement =<HTMLButtonElement> document.getElementById('delete');
        deleteButton.addEventListener('click',deleteCar);

        function deleteCar(): void{
           let inputDelete: HTMLInputElement =<HTMLInputElement> document.getElementById('IdToDelete');
           let carID: number = +inputDelete.value;
           console.log("car id is" + carID)

            axios.delete(carWebUrl + carID)
            .then(function(response : AxiosResponse){

                console.log( "the status is" +response.status)
                let message: HTMLHeadElement=<HTMLHeadElement> document.getElementById('deleted');
                message.innerHTML="Car is deleted"; 
            } )
            .catch( function( error: AxiosError){
                console.log(error);
                let message: HTMLHeadElement=<HTMLHeadElement> document.getElementById('deleted');
                message.innerHTML="Something went wrong";
            })

        }


