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

let getOnecarButton: HTMLButtonElement =<HTMLButtonElement> document.getElementById("GetOneCar");
getOnecarButton.addEventListener('click', getOne);
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

