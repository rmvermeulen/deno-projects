#! /usr/bin/env deno
import { App } from "x/alosaur/src/mod.ts";

import { HomeArea } from "./home.area.ts";

// Create alosaur application
const app = new App({ areas: [HomeArea] });

app.listen();
