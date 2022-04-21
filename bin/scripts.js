const { URL } = require('url');

const run = (command, options={}) => {
  const childProcess = require("child_process");
  childProcess.spawn("<cmd>", [], {shell: true, detached: true});
  childProcess.execSync(command, options,
    (error, stdout, stderr) => {
      if (error) {
        console.log(error.message);
        return;
      } else if (stderr) {
          console.log(stderr);
      } else if(stdout) {
        console.log(stdout);
      }
    }
  )
}

module.exports = {
  clone: (url) => {
    url = new URL(url);
    const folderPath = '~/src/' + url.pathname.split('/')[1];
    const repoName = url.pathname.split('/')[2].replace('.git', '');
    const repoPath = `${folderPath}/${repoName}`;
    run(`mkdir -p ${folderPath} && cd ${folderPath} && git clone ${url.href}`);
    // console.log("Cloned Repo");
  }
}
