import * as core from "@actions/core"
import * as github from "@actions/github"

try {
	// `who-to-greet` input defined in action metadata file
	const files = core
		.getInput("files")
		.split(",")
		.map((file) => file.trim())

	console.log(files)

	// Get the JSON webhook payload for the event that triggered the workflow
	const payload = JSON.stringify(github.context.payload, undefined, 2)
	console.log(`The event payload: ${payload}`)
} catch (error) {
	core.setFailed(error.message)
}
