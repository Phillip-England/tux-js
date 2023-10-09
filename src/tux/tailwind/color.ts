

// represents a color config setting for tailwind
type AppColorConfig = {
	name: string
	hex: string
}

// produces a new instances of AppColorConfig
const newAppColorConfig = (name:string, hex:string) => {
	let color: AppColorConfig = {
			'name': name,
			'hex': hex,
	}
	return color
}

// an array of all the colors for our application
const appColors: AppColorConfig[] = [
	newAppColorConfig('black', "#222222"),
	newAppColorConfig('white', "#FFFFFF"),
	newAppColorConfig('darkgray', "#333333"),
	newAppColorConfig('gray', "#555555"),
	newAppColorConfig('lightgray', "#999999"),
	newAppColorConfig('green', "#b5542d"),
	newAppColorConfig('red', "#e5173f"),
]

// writes app colors
export const initTailwindConfig = async () => {
	const file = Bun.file('./tailwind.config.js')
	const text = await file.text()
	const startIndexOfColors = text.indexOf('colors: {')
	let endIndexOfColors = 0
	for (let i = 0; i < text.length; i++) {
			if (i > startIndexOfColors && text[i] == '}') {
					endIndexOfColors = i+1
					break
			}
	}
	let colorSettings = ''
	for (let i = 0; i < appColors.length; i++) {
			colorSettings = colorSettings + `"${appColors[i].name}":"${appColors[i].hex}",`
	}
	const newColorConfig = `colors: {${colorSettings}}`
	let newfile = `${text.slice(0,startIndexOfColors)}${newColorConfig}${text.slice(endIndexOfColors,text.length)}`
	await Bun.write(file, newfile)
}