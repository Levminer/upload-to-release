import { getInput, setFailed } from "@actions/core"
import * as github from "@actions/github"
import { platform } from "os"

try {
	let osString = ""
	const os = platform()

	if (os === "win32") {
		osString = "windows"
	} else if (os === "darwin") {
		osString = "macos"
	} else if (os === "linux") {
		osString = "linux"
	} else {
		setFailed(`Unsupported OS: ${os}`)
	}

	const files = getInput(`${osString}-files`)
		.split(",")
		.map((file) => file.trim())

	console.log(files)

	console.log(`The event payload: ${github.context.ref}`)
} catch (error) {
	setFailed(error.message)
}
