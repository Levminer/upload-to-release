import { getInput, setFailed } from "@actions/core"
import { platform } from "os"
import { exec } from "@actions/exec"
import { join } from "path"
import { readFileSync } from "fs"

try {
	;(async () => {
		try {
			let osString = ""
			const os = platform()
			const overwrite = getInput("overwrite-files").toLowerCase() === "true"

			const workspace = process.env.GITHUB_WORKSPACE
			const versionPath = join(workspace, "package.json")
			const version = JSON.parse(readFileSync(versionPath, "utf-8")).version

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
				const args = ["release", "upload", version, join(workspace, file)]

				if (overwrite) {
					args.push("--clobber")
				}

				await exec("gh", args)
			}
		} catch (error) {
			setFailed(error.message)
		}
	})()
} catch (error) {
	setFailed(error.message)
}
