// import { playwrightLauncher } from '@web/test-runner-playwright';
import { defaultReporter } from '@web/test-runner'
import { junitReporter } from '@web/test-runner-junit-reporter'
const filteredLogs = ['Running in dev mode', 'lit-html is in dev mode']
export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  /** Test files to run */
  files: 'test/**/*.test.js',
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development']
  },
  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (
        typeof arg === 'string' &&        filteredLogs.some((l) => arg.includes(l))
      ) {
        return false
      }
    }
    return true
  },
  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  coverageConfig: {
    include: ['src/**/*.js'],
    exclude: ['src/**/constants/**']
  },
  reporters: [
    // use the default reporter only for reporting test progress
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
    // use another reporter to report test results
    junitReporter({
      outputPath: './coverage/test-results.xml', // default `'./test-results.xml'`
      reportLogs: true // default `false`,
    })
  ]
})