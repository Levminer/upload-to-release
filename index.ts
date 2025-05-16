import { getInput, setFailed } from "@actions/core"
import { platform } from "os"
import { version } from "./package.json"
import { exec } from "@actions/exec"

try {
	;(async () => {
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
				return
			}

			const files = getInput(`${osString}-files`)
				.replaceAll("%v", version)
				.split(",")
				.map((file) => file.trim())

			for (const file of files) {
				await exec("gh", ["release", "upload", version, file])
			}
		} catch (error) {
			setFailed(error.message)
		}
	})()
} catch (error) {
	setFailed(error.message)
}
