import html from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import Elysia from "elysia";
import { TuxFileProvider, getFileExtension } from "../tux/lib";

const app = new Elysia()
app.use(html())
app.use(staticPlugin())


const fileProvider: TuxFileProvider = new TuxFileProvider()
await fileProvider.loadAppDirectories()
await fileProvider.loadAppFiles()

fileProvider.printAppComponentFiles()


