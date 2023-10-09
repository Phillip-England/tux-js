
import { BunFile } from "bun";
import { readdir } from "node:fs/promises";
import { join } from 'node:path';

//========================================================================
// FILE I/O UTILITIES
//========================================================================

// gives all the files within a dir as an array of string
async function getFiles(dirPath: string) {
	const fileNames = await readdir(dirPath);
	const filePaths = fileNames.map(fn => join(dirPath, fn));
	return filePaths;
}

// extracts the raw text from a file
const getRawFileText = async (file: BunFile) => {
	let rawText: string = await file.text()
	return rawText
}

// extracts the lines from a file
const getFileLines = (rawText: string) => {
	let newLineIndex: number[] = []
	let lines: string[] = []
	let fileLines: string[] = []
	for (let i = 0; i < rawText.length; i++) {
		let currentChar: string = rawText[i]
		let nextChar: string = rawText[i+1]
		if (currentChar == '\n' && nextChar != '\n' || i == 0 && currentChar != '\n') {
			newLineIndex.push(i)
		}
	}
	for (let i = 0; i < newLineIndex.length; i++) {
		let currentIndex: number = newLineIndex[i]
		let nextIndex: number = newLineIndex[i+1]
		if (nextIndex == undefined) {
			lines.push(rawText.slice(currentIndex, rawText.length))
			continue
		}
		let line: string = rawText.slice(currentIndex, nextIndex)
		if (line.length == 0) {
			continue
		}
		lines.push(line)
	}
	lines.forEach(line => {
		line = line.replace(/[\n\t]/g, '');
		if (line.length > 0) {
			fileLines.push(line)
		}
	})
	return fileLines
}

// returns a files extension if possible
// will return an empty string if path does not contain an extension
export const getFileExtension = (path: string) => {
	const indexOfDot: number = path.indexOf('.')
	if (indexOfDot < 0) {
		console.error('"path" in getFileExtension does not contain a "."')
	}
	const extension: string = path.slice(indexOfDot, path.length)
	return extension
}


//========================================================================
// APP FILE INTERFACE AND OPERATIONS
//========================================================================

// represents the structure of data associate with files in this project
interface TuxAppFile {
	path: string;
	rawFile: BunFile;
	rawText: string;
	fileLines: string[];
	extension: string
  }

  // takes in a TuxAppFile and extracts important details
  // to fill in class params
  const initTuxAppFileDetails = async (tuxAppFile: TuxAppFile) => {
	tuxAppFile.rawText = await getRawFileText(tuxAppFile.rawFile)
	tuxAppFile.fileLines = getFileLines(tuxAppFile.rawText)
	tuxAppFile.extension = getFileExtension(tuxAppFile.path)
  }

//========================================================================
// APP COMPONENT FILES
//========================================================================


// represents a component file in the app directory
export class TuxAppComponentFile implements TuxAppFile {
	path: string
	rawFile: BunFile
	rawText: string = ''
	fileLines: string[] = []
	extension: string = ''
	constructor(path: string) {
		this.path = path
		this.rawFile = Bun.file(path)
	}
}

//========================================================================
// APP ROUTE FILES
//========================================================================

// represents a route file in the app directory
export class TuxAppRouteFile  implements TuxAppFile {
	path: string
	rawFile: BunFile
	rawText: string = ''
	fileLines: string[] = []
	extension: string = ''
	constructor(path: string) {
		this.path = path
		this.rawFile = Bun.file(path)
	}
}

// provides tux file information to other classes
export class TuxFileProvider {
	appComponentDirPath: string = './src/app/component'
	appRouteDirPath: string = './src/app/route'
	appComponentFiles: TuxAppComponentFile[] = []
	appRouteFiles: TuxAppRouteFile[] = []
	appComponentDirectoryPaths: string[] = []
	appRouteDirectoryPaths: string[] = []
	// finds all component and route directors within ./src/app
	loadAppDirectories = async () => {
		const componentFilePaths = await getFiles(this.appComponentDirPath)
		const routeFilePaths = await getFiles(this.appRouteDirPath)
		// finds component directories
		componentFilePaths.forEach(path => {
			if (!path.includes('.')) {
				this.appComponentDirectoryPaths.push(path)
			}
		})
		// find route directories
		routeFilePaths.forEach(path => {
			if (!path.includes('.')) {
				this.appRouteDirectoryPaths.push(path)
			}
		})
	}
	// sifts through the component and route dirs to extract all file names
	async loadAppFiles() {
		// gets component files
		for (const path of this.appComponentDirectoryPaths) {
			const componentFiles = await getFiles(path);
			for (const filepath of componentFiles) {
				const componentFile = new TuxAppComponentFile(filepath)
				await initTuxAppFileDetails(componentFile)
				// all methods needed for ^ must be ran here
				this.appComponentFiles.push(componentFile);
		  	}
		}
		// gets route files
		for (const path of this.appRouteDirectoryPaths) {
			const routeFiles = await getFiles(path);
			for (const filepath of routeFiles) {
				const routeFile = new TuxAppRouteFile(filepath)
				await initTuxAppFileDetails(routeFile)
				// all methods for ^ must be ran here
				this.appRouteFiles.push(routeFile);
		  	}
		}
	}
	// prints out all files in ./src/app/component
	printAppComponentFiles = () => {
		this.appComponentFiles.forEach(file => {
			console.log(file)
		})
	}
	// prints out all files in ./src/app/route
	printAppRoutefiles = () => {
		this.appRouteFiles.forEach(file => {
			console.log(file)
		})
	}
}

//