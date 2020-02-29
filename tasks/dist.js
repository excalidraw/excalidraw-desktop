#!/usr/bin/env node
const argv = require("mri")(process.argv);

const exec = require("execa").sync;

const pkg = require("../package");

const {publish, config} = argv;

const artifactOptions = [
  "-c.artifactName=${name}-${version}-${os}-${arch}.${ext}",
  "-c.dmg.artifactName=${name}-${version}-${os}.${ext}",
  "-c.nsis.artifactName=${name}-${version}-${os}-setup.${ext}",
  "-c.nsisWeb.artifactName=${name}-${version}-${os}-web-setup.${ext}",
  argv.compress === false && "-c.compression=store",
].filter(f => f);

// interpret shorthand target options
// --win, --linux, --mac
const platforms = [
  argv.win ? "win" : null,
  argv.linux ? "linux" : null,
  argv.mac ? "mac" : null,
].filter(f => f);

const platformOptions = platforms.map(p => `--${p}`);

const publishOptions =
  typeof publish !== undefined
    ? [`--publish=${publish ? "always" : "never"}`].filter(f => f)
    : [];

const signingOptions = [`-c.forceCodeSigning=${false}`];

if (publish && (argv.ia32 || argv.x64)) {
  console.error("Do not override arch; is manually pinned");
  process.exit(1);
}

const archOptions = ["x64", "ia32"].filter(a => argv[a]).map(a => `--${a}`);

const args = [
  ...[config && `-c=${config}`].filter(f => f),
  ...archOptions,
  ...signingOptions,
  ...platformOptions,
  ...publishOptions,
  ...artifactOptions,
];

console.log(`
Building ${pkg.name} distro

---

  version: ${pkg.version}
  platforms: [${(platforms.length && platforms) || "current"}]
  publish: ${publish || false}

---

electron-builder ${args.join(" ")}
`);

exec("electron-builder", args, {
  stdio: "inherit",
});
