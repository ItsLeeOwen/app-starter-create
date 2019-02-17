export default class App {
  static Var = "Hello"

  greet = (...greetings) => {
    console.log("greeting:", ...greetings)
  }
}
