let arr = [];
let list =  document.getElementById("list");
BACKEND_URL = 'https://browser-extension-manager-ui-backend.onrender.com/users';

fetchAll();

//buttons
let all_id = document.getElementById('all');
let active_id = document.getElementById('active');
let inactive_id = document.getElementById('inactive');

let  theme_id = document.getElementById('theme');//theme
theme_id.addEventListener("click", ()=>changeTheme(theme_id));


all_id.addEventListener("click",async()=>{
fetchAll();
})


active_id.addEventListener("click",()=>{
  fetchActive();
})

inactive_id.addEventListener("click",()=>{
  fetchInactive();
})

async function fetchAll(){
await fetch(`${BACKEND_URL}`)
.then((res)=>res.json())
.then((data)=>{
   arr=[];
    if(data.length>0)
      {  arr = data;
         list.innerHTML=  '';

      }


});
  displayData(arr);  
 if(document.body.className == "light_theme"){
    
     let tab_ele = document.getElementsByClassName('tabs')[0].children;
      let det =  document.getElementsByClassName('detail');
      let rbtn = document.getElementsByClassName('remove_btn');
        changeLightSettings(tab_ele,det,rbtn);
  } 
}

async function fetchInactive(){
await fetch(`${BACKEND_URL}?isActive=false`)
.then((res)=>res.json())
.then((data)=>{
   arr=[];
    if(data.length>0)
      {  arr = data;
        list.innerHTML=  '';

      }        
});
displayData(arr);  
 if(document.body.className == "light_theme"){
    
     let tab_ele = document.getElementsByClassName('tabs')[0].children;
      let det =  document.getElementsByClassName('detail');
      let rbtn = document.getElementsByClassName('remove_btn');
        changeLightSettings(tab_ele,det,rbtn);
  } 
}
async function fetchActive(){
await   fetch(`${BACKEND_URL}?isActive=true`)
.then((res)=>res.json())
.then((data)=>{
  arr=[];
    if(data.length>0)
      {  arr = data;
          list.innerHTML=  '';
      }
});
displayData(arr);  
 if(document.body.className == "light_theme"){
     let tab_ele = document.getElementsByClassName('tabs')[0].children;
      let det =  document.getElementsByClassName('detail');
      let rbtn = document.getElementsByClassName('remove_btn');
        changeLightSettings(tab_ele,det,rbtn);
  } 
}

//Append Line items.
function displayData(arr){

if(arr.length > 0 )
    {
for(let i = 0 ; i < arr.length ;i++){
let box = document.createElement("div");
    box.id= 'box_'+arr[i].id;
    box.className = 'dark_box';
    let flex =  document.createElement("div");
    flex.id ='flex_'+arr[i].id;
    flex.style.cssText='display:flex;align-items:center';
    let img = document.createElement("img");
    img.id = 'img_'+arr[i].id;
    img.src = arr[i].logo;
    img.className='logo'
    let detail = document.createElement("div");
    detail.id= 'detail_'+arr[i].id;
    detail.className='detail';
    detail.style.cssText="flex:9;margin-left:5%";
    let p = document.createElement("p");
    p.id = "p_"+arr[i].id;
    p.innerText=arr[i].name;
    p.style.cssText='font-size:13px;font-weight:bold';
let span = document.createElement("span");
span.id = "span_"+arr[i].id;
span.innerText = arr[i].description;
span.className='dark_span';
let buttons = document.createElement("div");
buttons.id = 'buttons_'+arr[i].id;
buttons.style.cssText ='display:flex;align-items:center;margin-top:10%;justify-content:space-between'
let remove_btn = document.createElement("input");
remove_btn.type = 'Submit';
remove_btn.value ='Remove';
remove_btn.id = 'remove_btn_'+arr[i].id;
remove_btn.className = 'remove_btn';
remove_btn.style.cssText = 'cursor:pointer;border:1px solid hsl(226, 11%, 37%);color:hsl(0, 0%, 93%);padding:5px 8px;border-radius:15px;background-color:hsl(226, 25%, 17%)';
let range_btn = document.createElement("input");
range_btn.type = 'range';
range_btn.style.cssText ='width:30px;height:50px'
range_btn.id = 'range_btn'+arr[i].id;
range_btn.className = 'range_btn';
range_btn.min = "0";
range_btn.max = "100";
if(arr[i].isActive == true)
  range_btn.value = "100";
else if(arr[i].isActive == false)
  range_btn.value = "0";
range_btn.step = "100"
detail.appendChild(p);
detail.appendChild(span);
flex.appendChild(img);
flex.appendChild(detail);
buttons.appendChild(remove_btn);
buttons.appendChild(range_btn);
box.appendChild(flex);
box.appendChild(buttons);
list.append(box);
}

}
else{
  list.innerHTML = "No Data"
}

//Remove Extensions
let rmv = document.getElementsByClassName('remove_btn');
for(let i =0;i<rmv.length;i++){
    rmv[i].addEventListener("click",()=>{
        let pattern = /[0-9]{1}/g;
        let testid = rmv[i].id.match(pattern).join('');
        let rmv_id = testid
       fetch(`${BACKEND_URL}/${rmv_id}`,{method:'DELETE'})
       .then((res)=>{
        if(res.status == 200)
            alert('Data Deleted!!')
        else
            alert('Please try again!')
          window.location.reload(true);
       })
       
    })
}

//toggle betweeen active and inactive status
let togl = document.getElementsByClassName('range_btn');
for(let i =0;i<togl.length;i++){
    togl[i].addEventListener("change",()=>{
        let val = togl[i].value == "100" ? true :false;
        let pattern = /[0-9]{1}/g;
        let testid = togl[i].id.match(pattern).join('');
        let rmv_id = testid
       fetch(`${BACKEND_URL}/${rmv_id}`,{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({"isActive":val})
      })
       .then((res)=>{
        if(res.status == 200)
            alert('Data Updated!!')
        else
            alert('Please try again!');
          window.location.reload(true)
       })
       
    })
}
}

//theme change
function changeTheme(){
setTheme();
}

//set Theme
function setTheme(){
if( document.body.className =='dark_theme'){
    
   let tab_ele = document.getElementsByClassName('tabs')[0].children;
let det =  document.getElementsByClassName('detail');
let rbtn = document.getElementsByClassName('remove_btn');
   changeLightSettings(tab_ele,det,rbtn);

}
  else{
    
     let tab_ele = document.getElementsByClassName('tabs')[0].children;
      let det =  document.getElementsByClassName('detail');
      let rbtn = document.getElementsByClassName('remove_btn');
        changeDarkSettings(tab_ele,det,rbtn);



  } 
}

//Dark Settings
function changeDarkSettings(tab_ele,det,rbtn){
   document.body.style.cssText= "background-image:linear-gradient(180deg, #040918 0%, #091540 100%)";
    document.getElementById('container').style.cssText='color:hsl(200, 60%, 99%)';
   
     theme_id.src = 'images/icon-sun.svg';
     document.getElementsByClassName('ext_box')[0].style.backgroundColor='hsl(225, 23%, 24%)';
    theme_id.style.cssText='background-color: hsl(227, 75%, 14%);opacity:1;' ;
 for(let i =0;i<list.children.length;i++)
   {
      list.children[i].className ='dark_box';
   }
    for(let i =0;i<tab_ele.length;i++)
   {
    if(tab_ele[i].matches('input')){
     tab_ele[i].style.cssText='background-color:hsl(225, 23%, 24%);color:hsl(217, 61%, 90%)'
    }
}
 
  
    for(let i =0;i<det.length;i++)
   {
     det[i].children[1].className='dark_span';
   }

 for(let i =0;i<det.length;i++)
   {
     rbtn[i].style.cssText = 'cursor:pointer;border:1px solid hsl(226, 11%, 37%);color:hsl(0, 0%, 93%);padding:5px 8px;border-radius:15px;background-color:hsl(226, 25%, 17%)';
   }
     document.body.className ='dark_theme';
}

//Light Settings
function changeLightSettings(tab_ele,det,rbtn){
  document.body.style.cssText= "background-image:linear-gradient(180deg, #EBF2FC 0%, #EEF8F9 100%);";
    document.getElementById('container').style.cssText='color:hsl(226, 25%, 17%)';
    document.getElementsByClassName('ext_box')[0].style.backgroundColor='hsl(200, 60%, 99%)';
    theme_id.src = 'images/icon-moon.svg';
    theme_id.style.cssText='background-color:hsl(0, 0%, 78%);opacity:0.7;'
 for(let i =0;i<list.children.length;i++)
   {
      list.children[i].className ='light_box';
   }
     for(let i =0;i<tab_ele.length;i++)
   {
    if(tab_ele[i].matches('input')){
     tab_ele[i].style.cssText='background-color:hsl(200, 60%, 99%);color:hsl(226, 25%, 17%)'
    }
   }
    for(let i =0;i<det.length;i++)
   {
     det[i].children[1].className='light_span';
   }
 for(let i =0;i<det.length;i++)
   {
     rbtn[i].style.cssText = 'cursor:pointer;border:1px solid hsl(217, 61%, 90%);color:hsl(226, 25%, 17%);padding:5px 8px;border-radius:15px;background-color:hsl(0, 0%, 93%)`';
   }
      document.body.className ='light_theme';
}
