

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const register = document.querySelector('.btn-register');
const login = document.querySelector(".btn-login")

//login
// console.log(login)
login.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.querySelector(".email-login").value;
    const password = document.querySelector(".password-login").value

    const data = await axios.post("/api/v1/auth", { email, password })
    console.log(data);
})


//register
register.addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.querySelector('.name-register').value
    const email = document.querySelector('.email-register').value
    const password = document.querySelector('.password-register').value
    let clg = email.split("@")[1].split[0];
    const data = await axios.post("/api/v1/user", { name, email, password, clg })
    console.log(data)

})


signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});