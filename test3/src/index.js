import App from "app"
import "./index.scss"

console.log("index.js", process.env)

const app = new App()
app.greet("dzień dobry", "hello", process.env.PUBLIC_KEY_EXAMPLE)
