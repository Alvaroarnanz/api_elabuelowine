import "dotenv/config"
import bcrypt from "bcrypt"

async function main() {
  const plainPassword = process.argv[2]

  if (!plainPassword) {
    throw new Error("Debes pasar una contraseña. Ejemplo: npm run hash 1234")
  }

  const hash = await bcrypt.hash(plainPassword, 10)
  console.log(hash)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})