#! /usr/bin/env deno

import { Maybe } from "./maybe.ts";

import * as Decorators from './decorators.ts'

import { Application } from './Application.ts'

const app = new Application();

app.start();
