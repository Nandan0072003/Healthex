let loc
function find(){
  loc=window.location.href
  console.log(loc)
}
find()
import {initializeApp} from 'firebase/app'
import {
   getFirestore,collection,getDocs,onSnapshot,
   addDoc,deleteDoc,doc,
   query,where,
   orderBy,serverTimestamp,
   getDoc,
   updateDoc
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,signInWithEmailAndPassword
} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCqda3kOUAJT-DAOw5xrnh_WX0xP4LB3KQ",
  authDomain: "healthex-3469b.firebaseapp.com",
  projectId: "healthex-3469b",
  storageBucket: "healthex-3469b.appspot.com",
  messagingSenderId: "216193809702",
  appId: "1:216193809702:web:38f4939a4c387810e015e7"
};
initializeApp(firebaseConfig)
let tempemail,temppassword
// init services
const db=getFirestore()
// collection ref
const colRef=collection(db,'userinformation')
const colRef2=collection(db,'doctorinformation')
//adding
//const  adduser=document.querySelector('.userregisteration')

    //authentication
   const auth=getAuth()
if (loc=='http://127.0.0.1:5500/dist/0401useraccountcreate.html'){
   //signing users up
   let uid
   const authen1=document.querySelector('.userregisteration')
   authen1.addEventListener('submit',(e)=>{
   e.preventDefault()
   tempemail=authen1.email.value
   temppassword=authen1.password.value
   const email=authen1.email.value
   const pass=authen1.password.value
   createUserWithEmailAndPassword(auth,email,pass)
  .catch((error) => {
    console.log('Error fetching user data:', error);
  })
  

   .then(()=>{
    console.log("hello")
    adduser1()
    authen1.reset()
   })})
   .catch((err)=>
   {console.log(err.message)})
   function adduser1(){
    console.log("pkpok")
    addDoc(colRef,{
      username:authen1.username.value,
      email:tempemail,
      aadhar:authen1.Aadhar.value,
      //password:authen1.password.value,
      //userid:"8808nn909j"

    }).then(()=>{
      authen1.reset()
      window.location.href = "01indexhome.html";
    })}
  const authen2=document.querySelector(".healthcreate")
   authen2.addEventListener('submit',(e)=>{
   e.preventDefault()
   tempemail=authen2.email.value
   temppassword=authen2.password.value
   const email=authen2.email.value
   const pass=authen2.password.value
   createUserWithEmailAndPassword(auth,email,pass)
  .catch((error) => {
    console.log('Error fetching user data:', error);
  })

   .then(()=>{
    console.log("hello")
    adduser2()
    authen2.reset()
   })})
   .catch((err)=>
   {console.log(err.message)})
   function adduser2(){
    console.log("pkpok")
    addDoc(colRef,{
      username:authen2.username.value,
      email:tempemail,
      aadhar:authen2.Aadhar.value,

    }).then(()=>{
      authen2.reset()
      window.location.href = "05admin.html";
    })}
}
else if(loc=="http://127.0.0.1:5500/dist/0402healthprofessionalcreate.html" ){
   const authen2=document.querySelector(".healthcreate")
   authen2.addEventListener('submit',(e)=>{
   e.preventDefault()
   tempemail=authen2.Email.value
   temppassword=authen2.password.value
   const email=authen2.Email.value
   const pass=authen2.password.value
   createUserWithEmailAndPassword(auth,email,pass)
  .catch((error) => {
    console.log('Error fetching user data:', error);
  })

   .then(()=>{
    console.log("hello")
    adduser2()
    authen2.reset()
   })})
   .catch((err)=>
   {console.log(err.message)})
   function adduser2(){
    console.log("pkpok")
    addDoc(colRef2,{
      username:authen2.username.value,
      email:tempemail,
      aadhar:authen2.Aadhar.value,

    }).then(()=>{
      authen2.reset()
      window.location.href = "03loginsignup.html";
    })}
  }
  else if(loc=="http://127.0.0.1:5500/dist/0601userinfoadd.html"){
       //   console.log("hfine")
          const userinfoadd1 = document.querySelector(".fillupdetails")
         userinfoadd1.addEventListener('submit', (e) => {
          e.preventDefault()
          const Symptoms = userinfoadd1.Symptoms.value
          const Inference = userinfoadd1.Inference.value
          const Treatment = userinfoadd1.Treatment.value
          console.log(Treatment)
          userinfoadd1.reset()
          location.href='05admin.html'
        }
)
  }
else if(loc=="http://127.0.0.1:5500/dist/03loginsignup.html"){
          const el = document.querySelector(".login-form")
          el.addEventListener('submit', (e) => {
          e.preventDefault()
          const user = document.querySelector(".user").value
          const email =document.querySelector(".email").value
          if (user.startsWith("D")==true){
            const q=query(colRef2,where("email","==",email))
            console.log(q)
            onSnapshot(q,(snapshot)=>{
            snapshot.docs.forEach((doc)=>
             {
            const tempuser=doc.data().username
            console.log(tempuser)
             if (tempuser==user){
              window.location.href='05admin.html'
            }
            else{
              window.alert("Invalid credential")
            }
             })
         })
            el.reset()
          }
          
          else{
            window.alert("Invalid credential")
            el.reset()
          }
         // location.href='01indexhome.html'
        }
)
}
       else if(loc=="http://127.0.0.1:5500/dist/userviewpatienthistory.html"){
           const el = document.querySelector(".viewpatienthistory")
          el.addEventListener('submit', (e) => {
          e.preventDefault()
          const user = document.getElementById("inputName").value
          const email =document.getElementById("inputEmail").value
          if (user.startsWith("D")==true){
            window.alert("Error")
            el.reset()
          }
          else if(user.startsWith("U")==true){
              console.log("user")
              const q2=query(colRef,where("email","==",email))
              onSnapshot(q2,(snapshot)=>{
                snapshot.docs.forEach((doc)=>
               {
            const tempuser1=doc.data().username
            console.log(tempuser1)
             if (tempuser1==user){
              window.location.href='0602userinfoview.html'
            }
            else{
              window.alert("Invalid credential")
            }
             })
         })
            el.reset()
            
          }
          else{
            window.alert("Invalid credential")
            el.reset()
          }
         // location.href='01indexhome.html'
        }
)

       }
else if (loc=="http://127.0.0.1:5500/dist/useraddpatientdetailcredentialcheck.html"){
  const el = document.querySelector(".viewpatienthistory")
          el.addEventListener('submit', (e) => {
          e.preventDefault()
          const user = document.getElementById("inputName").value
          const email =document.getElementById("inputEmail").value
          if (user.startsWith("D")==true){
            window.alert("Error")
            el.reset()
          }
          else if(user.startsWith("U")==true){
              console.log("user")
              const q2=query(colRef,where("email","==",email))
              onSnapshot(q2,(snapshot)=>{
                snapshot.docs.forEach((doc)=>
               {
            const tempuser1=doc.data().username
            console.log(tempuser1)
             if (tempuser1==user){
              window.location.href='0601userinfoadd.html'
            }
            else{
              window.alert("Invalid credential")
            }
             })
         })
            el.reset()
            
          }
          else{
            window.alert("Invalid credential")
            el.reset()
          }
         // location.href='01indexhome.html'
        }
)
}


