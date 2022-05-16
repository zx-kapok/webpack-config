const path = require("path")
const fs = require("fs")
const packageJson = require("./package.json")

const filePath = path.resolve(__dirname, "package.json")

function getJsonData() {
  return packageJson
}

function getNewVersion(version) {
  const [major = 1, minor = 0, patch = 0] = version.split(".")
  let newPatch = +patch + 1
  let newMinor = +minor
  let newMajor = +major
  if (newPatch > 99) {
    newPatch = 0
    newMinor += 1
  }
  if (newMinor > 99) {
    newMinor = 0
    newMajor += 1
  }
  return `${newMajor}.${newMinor}.${newPatch}`
}

function updateVersion(data) {
  fs.writeFileSync(filePath, data)
}
function exec() {
  const jsonData = getJsonData()
  const newVersion = getNewVersion(jsonData.version)
  jsonData.version = newVersion
  updateVersion(JSON.stringify(jsonData, null, 4))
}

exec()
