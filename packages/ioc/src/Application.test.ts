import { expect, suite } from './test_suite.ts'
import { Application } from './Application.ts'

const it = suite('Application')

Deno.test("Application", async () => {
    const app = new Application()
    app.start()
    await app.close()
})